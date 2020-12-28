import React from 'react';
import { NavLink } from "react-router-dom";

import './styles/Navbar.css'

export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar-top">
				<NavLink exact to="/" className="navbar-logo">
					<span style={{color: "#DE396B"}}>BABA</span> IS <span style={{color: "#DE396B"}}>BOOKMARK</span>
				</NavLink>
			</div>
			<div className="navbar-bottom">
				<div className="navbar-link-container">
					{/* <NavLink className="navbar-link" to="/featured">
						FEATURED LEVELS
					</NavLink> */}
					<NavLink activeClassName="navbar-link-active" className="navbar-link" to="/browse">
						Level browser
					</NavLink>
					<NavLink activeClassName="navbar-link-active" className="navbar-link" to="/add">
						Submit levels
					</NavLink>
				</div>
			</div>
			<span className="navbar-beta-message">
				Now in beta!
			</span>
		</nav>
	)
}