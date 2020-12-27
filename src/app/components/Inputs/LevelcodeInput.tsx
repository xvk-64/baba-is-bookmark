import React, { ChangeEvent, useEffect, useState } from 'react'
import { getLevelData, LevelData } from 'common/LevelData'

import BabaButton from '@components/Inputs/BabaButton'
import BabaTextInput from '@components/Inputs/BabaTextInput'

import './styles/LevelcodeInput.css'

function checkLevelCode(levelCode: string) {
	return levelCode 
		&& levelCode.length == 9
		&& levelCode[4] == "-"
}

export declare interface ILevelcodeInputProps {
	onLevelData: (d: LevelData) => void
	onSubmit: (code: string) => void
}

export default function LevelcodeInput(props: ILevelcodeInputProps) {
	let [error, setError] = useState("")
	let [valid, setValid] = useState(false)
	let [code, setCode] = useState("")

	function onCodeChanged(e: ChangeEvent<HTMLInputElement>) {
		props.onLevelData({code: ""})
		setValid(false)
		
		let value = e.target.value.split("-").join("").toUpperCase()
		
		if (value.length > 9 || (value && /[^A-Z0-9]/.test(value)))
			value = e.target.defaultValue
		
		if (value.length > 4 && value[4] != "-")
			value = value.substr(0, 4) + "-" + value.substr(4, 4)
		
		e.target.defaultValue = value

		setCode(value)
	}
	
	async function checkDatabase() {
		setError("")

		// Check if the code is formatted properly
		if (!checkLevelCode(code)) {
			setError("Incomplete level code!")
			return
		}

		props.onLevelData({code: "", name: "Loading..."})

		// Check the database to see if the level already exists
		let result = await fetch(process.env.API_URL + "/level/?code=" + code)
		
		let json = await result.json()

		if (json.success) {
			setError("Database already contains level!")
			props.onLevelData(getLevelData(json.data))
			return
		} else if (json.error) {
			// Some other error
			if (!json.notFound) {
				// Notfound is acceptable since we want the level to not exist yet
				console.log(json.message)
				setError("An internal server error occured! Please try again.")
				return
			}
		}

		// Check if the level exists on the official server
		result = await fetch(process.env.API_URL + "/level/download/?code=" + code)
		json = await result.json()

		if (json.error) {
			props.onLevelData({code: ""})
			setError("Level does not exist!")
			return
		}

		props.onLevelData(getLevelData(json.data))

		setValid(true)
	}

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		props.onSubmit(code)	
	
		setValid(false)
		setCode("")
	}

	useEffect(() => { checkDatabase() }, [code])

	return (
		<form className="levelcodeInput-form" onSubmit={handleSubmit}> 
			<div className="levelcodeInput-input-container">
				<BabaTextInput onChange={onCodeChanged} 
					name="levelcode" 
					className="levelcodeInput-input" 
					placeholder="xxxx-xxxx"
					value={code}
					maxLength={9} 
				/>
				<BabaButton disabled={!valid}>Submit</BabaButton>
			</div>

				<span className="levelcodeInput-input-message error">
					{code && error}
				</span>
		</form>
	)
}