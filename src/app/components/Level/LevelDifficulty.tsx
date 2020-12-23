import React from 'react'

import './LevelDifficulty.css'

export declare interface ILevelDifficultyProps {
	levelDifficulty: number;
}

// Used for array.map
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function LevelDifficulty(props: ILevelDifficultyProps) {
	return (
		<div 
			className="levelDifficulty-container"
			title={props.levelDifficulty + "/10"}
		>
			{
				numbers.map(i => 
					props.levelDifficulty >= i 
						? <i key={i} className="icon icon-difficulty-shaded" />
						: <i key={i} className="icon icon-difficulty-hollow" />
				)
			}
		</div>
	)
}