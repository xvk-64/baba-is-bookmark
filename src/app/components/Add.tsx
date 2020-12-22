import React, { useState } from 'react'

import LevelcodeInput from './LevelcodeInput'
import Level from './Level/Level'

import './Add.css'
import { LevelData } from "common/LevelData"

let initialDisplayLevelData = {code: ""}

export default function Add() {
	let [displayLevelData, setDisplayLevelData] = useState(initialDisplayLevelData)

	function onLevelData(levelData: LevelData) {
		setDisplayLevelData(levelData)
	}

	return (
		<div className="add-container">
			<h2>
				Add Levels
			</h2>
			<p>
				Enter the level code of an uploaded level below to add it to Baba Is Bookmark.
			</p>
			<LevelcodeInput onLevelData={onLevelData}/>
			<Level levelData={displayLevelData}/>
		</div>
	)
}