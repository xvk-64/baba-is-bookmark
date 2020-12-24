import React from 'react'

import './styles/BabaButton.css'

export declare interface IBabaButtonProps extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
	squareSize?: undefined | "sm" | "md" | "lg"
}

export default function BabaButton(props: IBabaButtonProps) {
	let {squareSize, ...buttonProps} = props

	return (
		<button
			{...buttonProps}
			className={ buttonProps.className + " babaButton" + (squareSize ? ` babaButton-square babaButton-square-${props.squareSize}` : "")}
		/>
	)
}