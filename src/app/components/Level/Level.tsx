import React from 'react'

import {LevelData} from "common/LevelData"

import './Level.css'
import 'assets/styles/icons.css'

import LevelCode from "./LevelCode"
import LevelDifficulty from "./LevelDifficulty"
import LevelThumbnail from "./LevelThumbnail"

export declare interface ILevelProps {
	levelData: LevelData;
}

const colours: string[][] = [
	["#FF74CC", "#EB91CA", "#CC74AC"], // Rosy
	["#EB346C", "#D9396A", "#AD234D"], // Pink
	["#FA4E32", "#E5533B", "#C63D26"], // Red
	["#F99A3E", "#E49950", "#CE8640"], // Orange
	// Don't include yellow because it looks horrendous with white text
	// I tried my best to make it look good but it just doesn't
	// ["#F8E987", "#E8DD82", "#DDCB56"], // Yellow 
	["#B9C64B", "#A5B13F", "#939E34"], // Lime
	["#67993B", "#5C8339", "#496F26"], // Green
	["#30BBF5", "#83C8E5", "#6BADC9"], // Cyan
	["#876FFF", "#9183D7", "#7061B9"], // Blue
	["#AB67BF", "#8E5E9C", "#794D86"], // Purple
	["#A47B53", "#90673E", "#765534"], // Brown
	["#343E51", "#293141", "#202632"], // Black
	["#858585", "#737373", "#646464"], // Grey
	["#D4D4D4", "#C3C3C3", "#B1B1B1"], // Silver
	// Not even going to attempt white...
]

function hash(str: string): number {
	let counter = 0

	for (let i = 0; i < str.length; i++) {
		counter += str.charCodeAt(i) * i;
	}

	return counter;
}

export default function Level(props: ILevelProps) {
	let [headerColour, bodyColour, footerColour] = colours[hash(props.levelData.code) % colours.length]

	if (!props.levelData.code) {
		headerColour = ""
		bodyColour = ""
		footerColour = ""
	}

	return (
		<div className="level" style={{backgroundColor:footerColour}}>
			<div 
				className="level-header-container" 
				style={{backgroundColor:headerColour}}
				title={props.levelData.name}
			>
				<div className="level-header level-truncate-text">
					{props.levelData.name}
				</div>
			</div>
			<div className="level-body" style={{backgroundColor:bodyColour}}>
				<div className="level-author-container">
					{
						props.levelData.author &&
						<span 
							className="level-author level-truncate-text"
							title={props.levelData.author}
						>
							By {props.levelData.author?.trimStart()}
						</span>
					}
					<span 
						className="level-date"
						title={props.levelData.timestamp?.toLocaleString()}
					>
						{props.levelData.timestamp?.toLocaleDateString()}
					</span>
				</div>
				<div className="level-thumbnail-container">
					{
						props.levelData.code &&
						<LevelThumbnail
							levelCode={props.levelData.code}
						/>
					}
					{
						props.levelData.description &&
						<div 
							className="level-description"
							title={props.levelData.description}
						>
							{props.levelData.description}
						</div>
					}
				</div>
				{
					props.levelData.difficulty != undefined &&
					<LevelDifficulty 
						levelDifficulty={props.levelData.difficulty || 0} 
					/>
				}
			</div>
			<LevelCode 
				showInCentre={props.levelData.difficulty == undefined} 
				style={{backgroundColor:footerColour}} 
				levelCode={props.levelData.code} 
			/>
		</div>
	)
}