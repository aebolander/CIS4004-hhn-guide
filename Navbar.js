import React from 'react';
import './Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-center">
                <ul className="nav-links">
                    <li><a href="/houses">Houses</a></li>
                    <li><a href="/scarezones">Scarezones</a></li>
                    <li><a href="/shows">Shows</a></li>
                    <li><a href="/account" className="user-icon">Account</a></li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;