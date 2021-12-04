import { stringify } from "querystring"
import React, { useEffect, useState } from 'react'

import "./styles/RainbowText.css"

export declare interface IRainbowTextProps {
	text: string;
}

export default function RainbowText(props: IRainbowTextProps) {
	let i = 0;
	return <span className="rainbowText">{props.text.split("").map(value => <span key={i++}>{value}</span>)}</span>
}