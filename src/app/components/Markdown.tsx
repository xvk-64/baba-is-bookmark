import React, { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import BabaButton from "./Inputs/BabaButton"

import './styles/Markdown.css'

export declare interface IMarkdownProps {
	markdownPath: string
}

export default function Markdown(props: IMarkdownProps) {
	let [markdown, setMarkdown] = useState("")
	let [showCustomStyles, setShowCustomStyles] = useState(true)

	const loadMarkdown = async () => {
		let result = await fetch(props.markdownPath)

		setMarkdown(await result.text())
	}

	useEffect(() => { loadMarkdown() }, [props.markdownPath])

	const handleStyleModeChange = () => {
		setShowCustomStyles(!showCustomStyles)
	}

	return  (
		<div className={"markdown-container" + (showCustomStyles ? " markdown-styles" : "")}>
			<div className="markdown-options-container">
				<BabaButton onClick={handleStyleModeChange}>
					{showCustomStyles ? "Disable styles" : "Enable styles"}
				</BabaButton>
			</div>
			<ReactMarkdown>{markdown}</ReactMarkdown>
		</div>
	)
}