import express from "express"
import http from "http"
import path from "path"
import fs from "fs"
import fetch from "node-fetch"
import {InputType, unzip} from "zlib"
import { Pool } from 'pg';

import {LevelData} from "common/LevelData"
import LevelDifficulty from "app/components/Level/LevelDifficulty"

const router = express.Router();

router.use(express.json())

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: process.env.IS_PRODUCTION ? true : false
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

// Downloads level data from the official server
async function downloadLevelData(levelCode: string) {
	let target = process.env.SERVER_URL + "/" + levelCode + ".ld"

	console.log(`Downloading level ${levelCode} from ${target}`)

	let res = await fetch(target)

	if (!res.ok)
		throw new Error("Server did not return response code 200 OK!")

	let buffer = await res.arrayBuffer()

	let result = await unzipBuffer(buffer)

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

// Get level data for a code from the database
router.get("/level", async (request, response) => {
	let levelCode = request.query["code"] + ""
	
	if (!checkLevelCode(levelCode)) {
		response.json({error: true, message: `Couldn't download! Reason: Incorrect levelcode formatting!`})
		return
	}
	
	let levelData = await getLevelData(levelCode)
	
	response.json(levelData ? levelData : {notFound: true})
})

// Inserts leveldata into the database
async function insertLevelData(levelData: LevelData) : Promise<LevelData> {
	let result = await pool.query('INSERT INTO levels(code, name, author, timestamp, difficulty, description) VALUES($1, $2, $3, $4, $5, $6) RETURNING *'
		, [levelData.code, levelData.name, levelData.author, levelData.timestamp, levelData.difficulty, levelData.description])

	return result.rows[0]
}

// Download level data for a code from the official server
router.get("/level:download", async(request, response) => {
	let levelCode = request.query["code"] + ""

	// Check formatting of levelcode
	if (!checkLevelCode(levelCode)) {
		response.json({error: true, message: `Couldn't download! Reason: Incorrect levelcode formatting!`})
		return
	}

	// Check if level is already in database
	if (await getLevelData(levelCode)) {
		response.json({error: true, message: `Couldn't download due to database error! Reason: Level already exists in database!`})
		return
	}

	// Try and download from the server
	let levelData
	try {
		levelData = await downloadLevelData(levelCode)
	} catch(e) {
		response.json({error: true, message: `Couldn't download! Reason: ${e.message}`})
		return
	}

	response.json(levelData)
})

// Download level data for a code from the official server and insert it into the database
router.post("/level", async(request, response) => {
	let levelCode = request.query["code"] + ""

	// Check formatting of levelcode
	if (!checkLevelCode(levelCode)) {
		response.json({error: true, message: `Couldn't insert due to download error! Reason: Incorrect levelcode formatting!`})
		return
	}

	// Check if level is already in database
	if (await getLevelData(levelCode)) {
		response.json({error: true, message: `Couldn't insert due to database error! Reason: Level already exists in database!`})
		return
	}

	// Try and download from the server
	let levelData
	try {
		levelData = await downloadLevelData(levelCode)
	} catch(e) {
		response.json({error: true, message: `Couldn't insert due to download error! Reason: ${e.message}`})
		return
	}

	// Insert into database
	try {
		await insertLevelData(levelData)
	} catch (e) {
		response.json({error: true, message: `Couldn't insert due to database error! Reason: ${e.message}`})
		return
	}

	response.json({success: true, message: `Inserted level ${levelCode} successfully`})
})

// Get a list of levels dictated by search terms
router.get("/browse", async (request, response) => {
	let result = await pool.query('SELECT * FROM levels ORDER BY timestamp DESC')
	
	let levelData: LevelData[] = result.rows

	response.json(levelData)
})

export default router;