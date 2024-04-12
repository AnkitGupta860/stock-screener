import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

// This page is for registration
const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate('');

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate('/');
        }
    })

//Here we collect the registration data and navigate to login page
    const collectData = async () => {
        console.warn(name, email, password);
        let result = await fetch('http://localhost:7000/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
            },
        });

        result = await result.json();
        if(result && result.email>0 && result.password>0){
            navigate("/login");

        }

    }

    // console.log("name :::::::::;", name);
    // console.log("Email ::::::::::::",email);
    // console.log("password ::::::::",password);

    return (
        <div className='register'>
            <h1>Register</h1>

            <input className='inputBox' type='text'
                value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' />

            <input className='inputBox' type='text'
                value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' />

            <div className='passClass'>
                <input className='inputBox'type={showPassword ? 'text' : 'password'}
                    value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Enter Password' />
               {showPassword ?  <VisibilityIcon style={{position:"absolute",top: "30px", right: "40px", cursor: "pointer"}} onClick={() => setShowPassword(!showPassword)}/> :  <VisibilityOffIcon style={{position:"absolute",top: "30px", right: "40px", cursor: "pointer"}} onClick={() => setShowPassword(!showPassword)}/>}
            </div>

            <button onClick={collectData} className="appButton" type='button'>Sign Up</button>

        </div>
    )
}

export default SignUp;