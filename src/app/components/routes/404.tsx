import React from 'react';

import image from '@assets/img/sleepy.gif'

import './styles/404.css'

export default function Error404() {
	return (
	<div className="error-container">
		<h1>Error 404!</h1>
		<img className="error-sleepy" src={image} />
		<p className="error-text">
			The requested resource does not exist.
		</p>
	</div>
	)
}