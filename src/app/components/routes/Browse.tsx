import React, { useEffect, useState } from 'react'

import {getLevelData, LevelData} from 'common/LevelData'

import LevelGallery from '@components/Level/LevelGallery'
import BabaSelect from '@components/BabaSelect'
import Select from "react-select"

let initialLevels: LevelData[] = []

const options = [
	{ value: 'chocolate', label: 'Chocolate', isDisabled: true },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' },
];

export default function Browse() {
	let [levels, setLevels] = useState(initialLevels)

	useEffect(() => {
		fetchLevels()
	}, [])

	return (
		<>
			<BabaSelect 
				options={options}
				defaultValue={options[0]}
				isSearchable={false}
				width="250px"
				isMulti
				onChange={e => console.log(e)}
			/>

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