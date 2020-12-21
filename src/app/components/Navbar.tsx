import React from 'react';
import { NavLink } from "react-router-dom";

import './Navbar.css'

export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="navbar-top">
				<span className="navbar-logo">
					<span style={{color: "#DE396B"}}>BABA</span> IS <span style={{color: "#DE396B"}}>BOOKMARK</span>
				</span>
			</div>
			<div className="navbar-bottom">
				<div className="navbar-link-container">
					<NavLink className="navbar-link" to="/featured">
						FEATURED LEVELS
					</NavLink>
					<NavLink className="navbar-link" exact to="/">
						BROWSE LEVELS
					</NavLink>
					<NavLink className="navbar-link" to="/add">
						ADD LEVELS
					</NavLink>
				</div>
			</div>
		</nav>
	)
}