import React, { useState } from 'react'

import './LevelCode.css'

export declare interface ILevelCodeProps {
	levelCode: string;
	style?: React.CSSProperties;
}

export default function LevelCode(props: ILevelCodeProps) {
	const [description, setDescription] = useState("Click to copy")

	function copyToClipboard(e: any) {
		navigator.clipboard.writeText(props.levelCode)
		.then(() => {
			setDescription("Copied!")
			setTimeout(() =>
				setDescription("Click to copy")
			, 1000)
		})
	}
  
	return (
		<div style={props.style} className="levelCode-container">
			<span onClick={copyToClipboard} className="levelCode levelCode-copyable">
				{props.levelCode}
			</span>
			<div className="levelCode-description">
				{description}
			</div>
		</div>
	)
}