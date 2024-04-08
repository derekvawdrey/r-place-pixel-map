import React from 'react';

const Navbar = () => {
    return (
        <nav>
            <a className="logo" href="index.html">Pixelated Place</a>
            <div className="nav-links-container">
                <a className="profile-container" href="#" id="profileLink">
                    <div className="profile-circle">
                        <img src="./assets/images/profile.jpg" alt="Profile" />
                    </div>
                    <p className="profile-username" id="username">Profile name</p>
                </a>
                <ul className="nav-links">
                    <li><a href="#" id="loginLink" data-open-modal-id="loginModal">Login</a></li>
                    <li><a href="#" id="registerLink" data-open-modal-id="registerModal">Register</a></li>
                    <li><a href="javascript:logout()" id="logoutLink" className="hidden">Logout</a></li>
                </ul>
                <div className="mobile-menu-burger">
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
