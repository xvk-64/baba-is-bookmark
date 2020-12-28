import React, { useState } from 'react'

import LevelcodeInput from '@components/Inputs/LevelcodeInput'
import Level from '@components/Level/Level'

import './styles/Add.css'
import { LevelData } from "common/LevelData"

let initialDisplayLevelData = {code: ""}

export default function Add() {
	let [displayLevelData, setDisplayLevelData] = useState(initialDisplayLevelData)

	let [error, setError] = useState("")
	let [success, setSuccess] = useState("")
	let [info, setInfo] = useState("")

	function onLevelData(levelData: LevelData) {
		setError("")
		setSuccess("")
		setInfo("")

		setDisplayLevelData(levelData)
	}

	async function handleSubmit(levelCode: string) {
		console.log("Submitting level " + levelCode)

		setInfo("Submitting level " + levelCode + "...")

		let data = {
			code: levelCode
		}

		let result = await fetch(process.env.API_URL + "/level", {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		})

		let json = await result.json()

		setInfo("")

		if (json.error) {
			console.log(json.message)
			setError("An error occurred!")
			return
		}

		setSuccess("Successfully submitted level!")
	}

	return (
		<div className="add-container">
			<h2 className="pageHeader">
				Submit Levels
			</h2>
			<p>
				Enter the level code of an uploaded level below to add it to Baba Is Bookmark.
			</p>
			<p>
				<span className="error">{error}</span>
				<span className="success">{success}</span>
				<span className="info">{info}</span>
			</p>
			<LevelcodeInput onLevelData={onLevelData} onSubmit={handleSubmit}/>
			<Level levelData={displayLevelData}/>
		</div>
	)
}