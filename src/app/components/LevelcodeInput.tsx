import React, { ChangeEvent, useEffect, useState } from 'react'
import { getLevelData, LevelData } from 'common/LevelData'

import './LevelcodeInput.css'

function checkLevelCode(levelCode: string) {
	return levelCode 
		&& levelCode.length == 9
		&& levelCode[4] == "-"
}

export declare interface ILevelcodeInputProps {
	onLevelData: (d: LevelData) => void
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
		e.target.value = value

		setCode(value)
	}
	
	async function checkDatabase() {
		setError("")

		// Check if the code is formatted properly
		if (!checkLevelCode(code)) {
			setError("Incomplete level code!")
			return
		}

		// Check the database to see if the level already exists
		let result = await fetch(`http://localhost:5000/api/level?code=${code}`)
		let json = await result.json()

		if (!json.notFound) {
			setError("Database already contains level!")
			props.onLevelData(getLevelData(json))
			return
		}

		// Check if the level exists on the official server
		result = await fetch(`http://localhost:5000/api/level:download?code=${code}`)
		json = await result.json()

		if (json.error) {
			setError("Level does not exist!")
			return
		}

		props.onLevelData(getLevelData(json))

		setValid(true)
	}

	useEffect(() => { checkDatabase() }, [code])

	return (
		<form className="levelcodeInput-form"> 
			<div className="levelcodeInput-input-container">
				<input onChange={onCodeChanged} 
					type="text" 
					name="levelcode" 
					className="baba-text-input levelcodeInput-input" 
					placeholder="xxxx-xxxx"
					// Hack to disable autofill on Chrome
					onFocus={(e) => {e.target.autocomplete = "off"}}
					maxLength={9} 
				/>
				<input type="submit" className="baba-button" value="Submit" disabled={!valid}/>
			</div>

				<span className="levelcodeInput-input-error">
					{code && error}
				</span>
		</form>
	)
}