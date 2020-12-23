import React, { useEffect, useState } from 'react'

import {getLevelData, LevelData} from 'common/LevelData'

import LevelGallery from './Level/LevelGallery'

let initialLevels: LevelData[] = []

export default function Browse() {
	let [levels, setLevels] = useState(initialLevels)

	useEffect(() => {
		fetchLevels()
	}, [])

	return (
		<>


			<LevelGallery levels={levels} />
		</>
	)

	async function fetchLevels() {
		let result = await fetch(process.env.API_URL + "/browse")

		let json = await result.json()
		let newLevels: LevelData[] = json.map(getLevelData)

		setLevels(newLevels)
	}
}