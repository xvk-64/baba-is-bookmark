import express from "express"
import path from "path"
import fs, { existsSync } from "fs"
import fetch from "node-fetch"
import {InputType, unzip} from "zlib"
import { Pool } from 'pg';

import {LevelData} from "common/LevelData"

const tempDir = path.join(__dirname, "temp")
if (!fs.existsSync(tempDir))
	fs.mkdirSync(tempDir)

const router = express.Router();

router.use(express.json())

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: (process.env.IS_PRODUCTION ? { rejectUnauthorized: false } : false)
});


// Greet a user
router.get("/", (request, response) => {
	response.send("Welcome to the super secret API! :)")
})

// Unzips a buffer using gzip
async function unzipBuffer(buffer: InputType) {
	return new Promise<Buffer>((resolve, reject) => {
		unzip(buffer, (err, buffer) => {
			if (err) {
				reject(err)
			}
			resolve(buffer)
		});
	})
}

// Checks that a levelcode is formatted correctly
function checkLevelCode(levelCode: string) {
	return levelCode 
		&& levelCode.length == 9
		&& levelCode[4] == "-"
}

// Download and decode a file to a buffer from the official server
async function downloadAndDecode(fileName: string) {
	let downloadsDir = path.join(tempDir, "download")
	if (!fs.existsSync(downloadsDir))
		fs.mkdirSync(downloadsDir)

	let destination = path.join(downloadsDir, fileName)

	if (fs.existsSync(destination)) {
		return fs.readFileSync(destination)
	}

	let target = process.env.SERVER_URL + "/" + fileName

	let res = await fetch(target)

	if (!res.ok) {
		throw Error("Server did not return response code 200 OK!")
	}

	
	let buf = await res.buffer()
	
	let decoded = await unzipBuffer(buf)

	fs.writeFileSync(destination, decoded)

	return decoded
}

// Downloads level data from the official server
async function downloadLevelData(levelCode: string) {
	let download = downloadAndDecode(levelCode + ".ld")

	let result = await download

	return await parseLevelData(levelCode, result);

	// Decodes and parses data downloaded from the official server
	function parseLevelData(levelCode: string, buffer: Buffer) : LevelData {
		let levelData: LevelData = { 
			code: levelCode,
			timestamp: new Date()
		}
	
		let string = buffer.toString()
	
		string.split("\n").forEach(line => {
			let split = line.split("=")
	
			switch (split[0]) {
				case "name":
					levelData.name = split[1]
					break
				case "author":
					levelData.author = split[1]
					break
				case "subtitle":
					levelData.description = split[1]
					break
				case "difficultynum":
					levelData.difficulty = Number.parseInt(split[1])
					break
			}
		});
	
		return levelData
	}
}

// Searches the database for a level with the specified levelCode
async function getLevelData(levelCode: string) : Promise<LevelData> {
	let result = await pool.query('SELECT * FROM levels WHERE code = $1', [levelCode])
	
	return result.rows[0]
}

// Inserts leveldata into the database
async function insertLevelData(levelData: LevelData) : Promise<LevelData> {
	let result = await pool.query('INSERT INTO levels(code, name, author, timestamp, difficulty, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
	, [levelData.code, levelData.name, levelData.author, levelData.timestamp, levelData.difficulty, levelData.description])
	
	return result.rows[0]
}


async function getThumbnail(levelCode: string) {
	let thumbnailsDir = path.join(tempDir, "thumbnails")

	if (!existsSync(thumbnailsDir))
		fs.mkdirSync(thumbnailsDir)

	let filename = path.join(thumbnailsDir, levelCode + ".png")

	// Check for thumbnail in cache
	if (fs.existsSync(filename)) {
		let buf = fs.readFileSync(filename)

		return "data:image/png;base64," + buf.toString('base64')
	}

	// Need to download from level server
	let result = await fetch(process.env.SERVER_URL + "/" + levelCode + ".png")

	if (!result.ok)
		return ""
	
	let buf = await result.buffer()

	fs.writeFileSync(filename, buf)

	return "data:image/png;base64," + buf.toString("base64")
}

// Get level data for a code from the database
router.get("/level", async (request, response) => {
	if (request.query["code"] === undefined) {
		response.statusCode = 400
		response.json({error: true, message: "Missing \"code\" field on request query!"})
		return
	}

	let levelCode = request.query["code"] + ""
	
	if (!checkLevelCode(levelCode)) {
		response.statusCode = 400
		response.json({error: true, message: `Couldn't download! Reason: Incorrect levelcode formatting!`})
		return
	}
	
	let levelData = await getLevelData(levelCode)
	
	response.json(levelData ? levelData : {notFound: true})
})

// Download level data for a code from the official server
router.get("/level/download", async(request, response) => {
	if (request.query["code"] === undefined) {
		response.statusCode = 400
		response.json({error: true, message: "Missing \"code\" field on request query!"})
		return
	}

	let levelCode = request.query["code"] + ""

	// Check formatting of levelcode
	if (!checkLevelCode(levelCode)) {
		response.statusCode = 400
		response.json({error: true, message: `Couldn't download! Reason: Incorrect levelcode formatting!`})
		return
	}

	// Check if level is already in database
	if (await getLevelData(levelCode)) {
		response.statusCode = 500
		response.json({error: true, message: `Couldn't download due to database error! Reason: Level already exists in database!`})
		return
	}

	// Try and download from the server
	let download = downloadLevelData(levelCode)
	download.catch(e => {
		response.statusCode = 500
		response.json({error: true, message: `Couldn't download! Reason: ${e.message}`})
		return
	})

	let levelData = await download

	response.json(levelData)
})

// Download from official server/retreive thumbnail from cache
router.get("/level/thumbnail", async(request, response) => {
	if (request.query["code"] === undefined) {
		response.statusCode = 400
		response.json({error: true, message: "Missing \"code\" field on request query!"})
		return
	}

	let levelCode = request.query["code"] + ""

	// Check formatting of levelcode
	if (!checkLevelCode(levelCode)) {
		response.statusCode = 400
		response.json({error: true, message: `Couldn't download! Reason: Incorrect levelcode formatting!`})
		return
	}

	let result = await getThumbnail(levelCode)

	if (!result) {
		response.statusCode = 500
		response.json({error: true, message: `Couldn't download!`})
		return
	}

	response.json({success: true, data: result})
})

// Download level data for a code from the official server and insert it into the database
router.post("/level", async(request, response) => {
	if (request.body.code === undefined) {
		response.statusCode = 400
		response.json({error: true, message: "Missing \"code\" field on request body!"})
		return
	}
	
	let levelCode = request.body.code

	// Check formatting of levelcode
	if (!checkLevelCode(levelCode)) {
		response.statusCode = 500
		response.json({error: true, message: `Couldn't insert due to download error! Reason: Incorrect levelcode formatting!`})
		return
	}

	// Check if level is already in database
	if (await getLevelData(levelCode)) {
		response.statusCode = 500
		response.json({error: true, message: `Couldn't insert due to database error! Reason: Level already exists in database!`})
		return
	}

	// Try and download from the server
	let download = downloadLevelData(levelCode)
	download.catch(e => {
		response.statusCode = 500
		response.json({error: true, message: `Couldn't insert due to download error! Reason: ${e.message}`})
		return
	})

	let levelData = await download
		

	// Insert into database
	await insertLevelData(levelData)
		.catch(e => {
			response.statusCode = 500
			response.json({error: true, message: `Couldn't insert due to database error! Reason: ${e.message}`})
			return
		})

	response.json({success: true, message: `Inserted level ${levelCode} successfully`})
})

// Get a list of levels dictated by search terms
router.get("/browse", async (request, response) => {
	if (request.query["search"] === undefined) {
		response.statusCode = 400
		response.json({error: true, message: "Missing \"search\" field on request query!"})
		return
	}

	let before: Date = new Date()
	let after: Date = new Date()

	if (request.query["time"] === undefined) {
		if (request.query["after"] === undefined) {
			response.statusCode = 400
			response.json({error: true, message: "Missing \"time\" or \"after\" fields on request query!"})
			return
		} else {
			after = new Date(request.query["after"] + "")

			if (isNaN(after.getTime())) {
				response.statusCode = 400
				response.json({error: true, message: "\"after\" field on request query is not formatted correctly!"})
				return
			}

			if (request.query["before"] !== undefined) {
				before = new Date(request.query["before"] + "")

				if (isNaN(after.getTime())) {
					response.statusCode = 400
					response.json({error: true, message: "\"before\" field on request query is not formatted correctly!"})
					return
				}
			}
		}
	} else {
		let timeInterval: number = Number.parseInt(request.query["time"] + "")

		if (isNaN(timeInterval) || timeInterval < 0)
			timeInterval = 7
	
		if (timeInterval > 30)
			timeInterval = 30

		after.setDate(after.getDate() - timeInterval)

		if (timeInterval == 0) {
			after = new Date(0)
		}
	}

	if (before < after) {
		response.statusCode = 400
		response.json({error: true, message: "\"before\" field must be a date that is more recent than \"after\"!"})
		return
	}

	let searchTerm: string = request.query["search"] + ""


	let result = await pool.query(
		`SELECT * FROM levels
		WHERE (
			name ILIKE '%' || $1 || '%'
			OR author ILIKE '%' || $1 || '%'
			OR description ILIKE '%' || $1 || '%'
		) AND (
			($2, $3)
			OVERLAPS (timestamp, timestamp - interval '1 day')
		)`
		, [searchTerm, before, after])
	
	let levelData: LevelData[] = result.rows

	response.json(levelData)
})

router.get("/raw/ld", async(request, response) => {
	if (request.query["code"] === undefined) {
		response.statusCode = 400
		response.json({error: true, message: "Missing \"code\" field on request query!"})
		return
	}

	let levelCode = request.query["code"] + ""
	
	if (!checkLevelCode(levelCode)) {
		response.statusCode = 400
		response.json({error: true, message: `Couldn't download! Reason: Incorrect levelcode formatting!`})
		return
	}

	let download = downloadAndDecode(levelCode + ".ld")
	
	download.catch(e => {
			response.statusCode = 500
			response.json({error: true, message: `Server error: ${e.message}`})
			return
		})

	let buf = <Buffer>await download

	response.json({success: true, data: buf.toString()})
})

router.get("/raw/l", async(request, response) => {
	if (request.query["code"] === undefined) {
		response.statusCode = 400
		response.json({error: true, message: "Missing \"code\" field on request query!"})
		return
	}

	let levelCode = request.query["code"] + ""

	if (!checkLevelCode(levelCode)) {
		response.statusCode = 400
		response.json({error: true, message: `Couldn't download! Reason: Incorrect levelcode formatting!`})
		return
	}
	
	let download = downloadAndDecode(levelCode + ".l")
	download.catch(e => {
			response.statusCode = 500
			response.json({error: true, message: `Server error: ${e.message}`})
			return
		})

	let buf = <Buffer>await download

	response.json({success: true, data: buf.toString('base64')})
})

export default router;