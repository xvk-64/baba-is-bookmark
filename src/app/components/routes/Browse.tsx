import React, { ChangeEvent, useEffect, useState } from 'react'
import querystring from 'querystring'

import {getLevelData, LevelData} from 'common/LevelData'

import LevelGallery from '@components/Level/LevelGallery'
import BabaSelect from '@components/Inputs/BabaSelect'
import BabaTextInput from '@components/Inputs/BabaTextInput'
import BabaButton from "@components/Inputs/BabaButton"

import './styles/Browse.css'

let initialLevels: LevelData[] = []

const timeOptions = [
	{ value: 1, label: 'Past day' },
	{ value: 7, label: 'Past week' },
	{ value: 30, label: 'Past month' },
	{ value: 0, label: 'All time' },
]

const initialSearchValue = ""
const initialTimeValue = timeOptions[2]

export default function Browse() {
	let [levels, setLevels] = useState(initialLevels)

	let [searchValue, setSearchValue] = useState(initialSearchValue)
	let [timeValue, setTimeValue] = useState(initialTimeValue)
	let [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		fetchLevels()
	}, [])

	const fetchLevels = async () => {
		let queryObj = {
			search: searchValue,
			time: timeValue.value
		}

		setIsLoading(true)

		let result = await fetch(process.env.API_URL + "/browse?"+querystring.stringify(queryObj))

		let json = await result.json()
		let newLevels: LevelData[] = json.map(getLevelData)

		setLevels(newLevels)
		setIsLoading(false)
	}

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		fetchLevels()
	}

	const handleSearchValueChanged = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	} 

	const handleTimeValueChanged = (newValue: any) => {
		setTimeValue(newValue)
	}

	return (
		<>
			<form className="browse-option-container" onSubmit={handleSubmit}>
				
				<h2 className="browse-option-header">
					Search options
				</h2>

				<BabaTextInput 
					name="search" 
					className="browse-option-searchbar" 
					placeholder="Search..."
					value={searchValue}
					onChange={handleSearchValueChanged}
				/>

				<div className="browse-option">
					Display from
					<BabaSelect
						name="time"
						options={timeOptions}
						isSearchable={false}
						width="100%"
						value={timeValue}
						onChange={handleTimeValueChanged}
					/>
				</div>

				<BabaButton className="browse-search-button">
					Update search
				</BabaButton>
			</form>

			<LevelGallery isLoading={isLoading} levels={levels} />
		</>
	)
}