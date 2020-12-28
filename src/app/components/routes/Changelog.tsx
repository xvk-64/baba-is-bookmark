import React, { useEffect, useState } from 'react'
import { NavLink } from "react-router-dom"

import Markdown from '@components/Markdown'

import ChangelogMarkdown from './Changelog.md'

export default function Changelog() {
	return (
		<>
		<p>
			<NavLink to="/home">{"< Return to homepage"}</NavLink>
		</p>
		<h2 className="pageHeader">Changelog</h2>
		<Markdown markdownPath={ChangelogMarkdown} />
		</>
	)
}