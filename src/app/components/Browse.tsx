import React from 'react'

import {LevelData} from 'common/LevelData'

import LevelGallery from './Level/LevelGallery'

export default function Browse() {

	let levels: LevelData[] = [
		{
			code: "ABCD-EFGH",
			name: "Test Level 1",
			author: "Author",
			description: "A good description of the level",
			timestamp: new Date(Date.now()),
			difficulty: 2
		},
		{
			code: "IJKL-MNOP",
			name: "Test Level 2",
			author: "Author",
			description: "A good description of the level",
			timestamp: new Date(Date.now()),
			difficulty: 10
		},
		{
			code: "QRST-UVWX",
			name: "Test Level 3",
			author: "Author",
			description: "A good description of the level",
			timestamp: new Date(Date.now()),
			difficulty: 0
		},
		{
			code: "TTTT-TTTT",
			name: "Test Level 4",
			author: "Author",
			description: "A good description of the level",
			timestamp: new Date(Date.now()),
			difficulty: 0
		},
	]

	return (
		<LevelGallery levels={levels} />
	)
}