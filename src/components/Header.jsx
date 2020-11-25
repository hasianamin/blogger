import React from 'react';
import './../pages/style.css'
import {Link} from 'react-router-dom'

const Header=()=>{
    return (
        <div className='header-section'>
            <div className="header-container">
                <div className="header-logo">
                    Logo
                </div>
                <div className="header-nav">
                    <div className="nav-item">
                        <Link to='/'>Home</Link>
                    </div>
                    <div className="nav-item">
                        <Link to='/login'>Login</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header