import React, { useEffect, useState } from 'react'

import loadingImage from '@assets/img/loading.gif'

import './styles/LevelThumbnail.css'

export interface ILevelThumbnailProps {
	levelCode: string
}

export default function LevelThumbnail(props: ILevelThumbnailProps) {

	let [img, setImg] = useState(loadingImage)

	useEffect(() => { loadThumbnail() }, [])

	return (
		<img 
			src={img} 
			className="levelThumbnail-thumbnail"
		/>
	)

	async function loadThumbnail() {
		let result = await fetch(process.env.API_URL + "/level/thumbnail/?code=" + props.levelCode)

		let json = await result.json()
		
		if (json.success) {
			setImg(json.data)
		}
	}
}