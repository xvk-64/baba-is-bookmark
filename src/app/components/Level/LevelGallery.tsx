import React from 'react'
import Level from './Level'

import {LevelData} from 'common/LevelData'

import './LevelGallery.css'

export declare interface ILevelGalleryProps {
	levels: LevelData[];
}

export default function LevelGallery(props: ILevelGalleryProps) {
	return (
		<div className="levelGallery-gallery">
			{
				props.levels.map(levelData => 
					<Level key={levelData.code} levelData={levelData} />
				)
			}
		</div>
	)
}