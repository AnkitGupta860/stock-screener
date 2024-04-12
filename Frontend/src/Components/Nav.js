import React from 'react';
import { Link, json, useNavigate } from 'react-router-dom';

// This page is for Navbar
const Nav=()=>{
    const auth = localStorage.getItem('user');
    const navigate = useNavigate('');
    const logout=()=>{
        localStorage.clear();
        navigate('/signup');
    }
    return(
        <div style={{position:'fixed', width:'100%',zIndex:'999'}}> 
            <img className='logo' alt ="logo "src='https://pbs.twimg.com/profile_images/1266610467276910592/wnuaZwCL_400x400.jpg'></img>
            { auth ? <ul className='nav-ul'>
                <li><Link to="/TimeSeries">TimeSeries</Link></li>
                <li><Link to="/profile">Profile</Link></li>
                <li><Link onClick={ logout } to="/signup">Logout ({JSON.parse(auth).name})</Link></li>
            </ul>
            :
            <ul className='nav-ul nav-right'>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
    }
        </div>
    )
}

export default Nav;