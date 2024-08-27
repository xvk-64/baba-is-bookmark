import React from 'react'

import Logo from '@assets/img/logo.png'
import BabaPlanet from '@assets/img/baba-planet.png'
import GithubLogo from '@assets/img/icons/github.png'

import './styles/Home.css'
import { NavLink } from "react-router-dom"

export default function Home() {
	return (
		<>
			<div className="home-logo-container">
				<img className="home-logo" src={Logo} />
				<h2>Welcome to Baba Is Bookmark!</h2>
			</div>
			<div className="home-section-container">
				<div className="home-section">
					<p>
						Baba Is Bookmark is a web app that makes browsing for<br />
						and sharing levels made in <a href="https://hempuli.com/baba/">Baba Is You</a> easier!
					</p>
					<p>
						To get started, head over to the <NavLink to="/browse">Level Browser</NavLink>.<br />
						You can also <NavLink to="/add">Submit Levels</NavLink> that you've created.
					</p>
				</div>
				<div className="home-section">
					<img src={BabaPlanet} />
				</div>
				<div className="home-section">
					<p>
						<a href="https://github.com/SpiccyMayonnaise/baba-is-bookmark">
							Contribute on GitHub!
							<img src={GithubLogo} />
						</a>
					</p>
					<p>
						<NavLink to="/changelog">
							View changelog
						</NavLink>
					</p>
					<p>
						xvk-64, 2020-{new Date().getFullYear()}.
					</p>
				</div>
			</div>
		</>
	)
}