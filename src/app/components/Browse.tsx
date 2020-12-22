import React, { useEffect, useState } from 'react'

import {LevelData} from 'common/LevelData'

import LevelGallery from './Level/LevelGallery'

let initialLevels: LevelData[] = [
	{
		code: "ABCD-EFGH",
		name: "Test Level 1",
		author: "Author",
		description: "A good description of the level",
		timestamp: new Date(Date.now()),
		difficulty: 2
	},
	{
		code: "IJKL-MNOP",
		name: "Test Level 2",
		author: "Author",
		description: "A good description of the level",
		timestamp: new Date(Date.now()),
		difficulty: 10
	},
	{
		code: "QRST-UVWX",
		name: "Test Level 3",
		author: "Author",
		description: "A good description of the level",
		timestamp: new Date(Date.now()),
		difficulty: 0
	},
	{
		code: "1234-5678",
		name: "Test Level 4",
		author: "Author",
		description: "A good description of the level",
		timestamp: new Date(Date.now()),
		difficulty: 0
	},
]

export default function Browse() {
	let [levels, setLevels] = useState(initialLevels)

	useEffect(() => {
		fetchLevels()
	}, [])

	return (
		<LevelGallery levels={levels} />
	)

	async function fetchLevels() {
		let result = await fetch("http://localhost:5000/api/browse")

		let json = await result.json()
		let newLevels: LevelData[] = json.map((level: { code: string; name: string; author: string; description: string; difficulty: number; timestamp: string }) => {
			return {
				code: level.code,
				name: level.name,
				author: level.author,
				description: level.description,
				difficulty: level.difficulty,
				timestamp: new Date(level.timestamp)
			}
		})

		setLevels(newLevels)
	}
}