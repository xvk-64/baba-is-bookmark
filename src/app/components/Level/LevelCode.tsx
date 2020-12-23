import React, { useState } from 'react'

import './styles/LevelCode.css'

export declare interface ILevelCodeProps {
	levelCode: string
	showInCentre: boolean
	style?: React.CSSProperties
}

let initialDescription = "Click to copy"

export default function LevelCode(props: ILevelCodeProps) {
	const [description, setDescription] = useState(initialDescription)

	const [timer, setTimer] = useState(setTimeout(() => {}, 0))

	function copyToClipboard(e: any) {
		navigator.clipboard.writeText(props.levelCode)
		.then(() => {
			clearTimeout(timer)

			setDescription("Copied!")

			setTimer(setTimeout(() =>
				setDescription(initialDescription)
			, 1000))
		})
	}
  
	if (!props.levelCode)
		return <></>

	return (
		<div 
			style={props.style} 
			className={props.showInCentre 
				? "levelCode-container levelCode-centre" 
				: "levelCode-container"}
			title={props.levelCode}
		>
			<span onClick={copyToClipboard} className="levelCode levelCode-copyable">
				{props.levelCode}
			</span>
			<div className="levelCode-description">
				{description}	
			</div>
		</div>
	)
}