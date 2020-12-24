import React from 'react'

import './styles/BabaTextInput.css'

export declare interface IBabaTextInputProps extends React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	
}

export default function BabaTextInput(props: IBabaTextInputProps) {
	return (
		<input
			{...props}
			type="text"
			className={props.className + " babaTextInput"} 
			// Hack to disable autofill on Chrome
			onFocus={(e) => {e.target.autocomplete = "off"; if (props.onFocus) props.onFocus(e)}}
		/>
	)
}