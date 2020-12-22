import React from 'react'

import {LevelData} from "common/LevelData"

import './Level.css'
import 'assets/styles/icons.css'

import image from 'assets/img/RH4C-T468.png'
import LevelCode from "./LevelCode"
import LevelDifficulty from "./LevelDifficulty"

export declare interface ILevelProps {
	levelData: LevelData;
}

const colours: string[][] = [
	["#FF74CC", "#EB91CA", "#CC74AC"], // Rosy
	["#EB346C", "#D9396A", "#AD234D"], // Pink
	["#FA4E32", "#E5533B", "#C63D26"], // Red
	["#F99A3E", "#E49950", "#CE8640"], // Orange
	["#F8E987", "#E8DD82", "#DDCB56"], // Yellow
	["#B9C64B", "#A5B13F", "#939E34"], // Lime
	["#67993B", "#5C8339", "#496F26"], // Green
	["#30BBF5", "#83C8E5", "#6BADC9"], // Cyan
	["#876FFF", "#9183D7", "#7061B9"], // Blue
	["#AB67BF", "#8E5E9C", "#794D86"], // Purple
	["#A47B53", "#90673E", "#765534"], // Brown
	["#343E51", "#293141", "#202632"], // Black
	["#858585", "#737373", "#646464"], // Grey
	["#D4D4D4", "#C3C3C3", "#B1B1B1"], // Silver
]

function hash(str: string): number {
	let counter = 0

	for (let i = 0; i < str.length; i++) {
		counter += str.charCodeAt(i) * (i + 1);
	}

	return counter;
}

export default function Level(props: ILevelProps) {
	let [headerColour, bodyColour, footerColor] = colours[hash(props.levelData.code) % colours.length]

	return (
		<div className="level" style={{backgroundColor:footerColor}}>
			<div className="level-header-container" style={{backgroundColor:headerColour}}>
				<div className="level-header level-truncate-text">
					{props.levelData.name}
				</div>
			</div>
			<div className="level-body" style={{backgroundColor:bodyColour}}>
				<div className="level-author-container">
					<span className="level-author level-truncate-text">
						By {props.levelData.author?.trimStart()}
					</span>
					<span className="level-date">
						{props.levelData.timestamp?.toLocaleDateString()}
					</span>
				</div>
				<div className="level-thumbnail-container">
					<img src={image} className="level-thumbnail"/>
					<div className="level-description">
						{props.levelData.description}
					</div>
				</div>
				<LevelDifficulty levelDifficulty={props.levelData.difficulty || 0} />
			</div>
			<LevelCode style={{backgroundColor:footerColor}} levelCode={props.levelData.code} />
		</div>
	)
}