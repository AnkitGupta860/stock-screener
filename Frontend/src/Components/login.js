import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';


// This page is for login 
const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [loader, setLoader] = useState("")
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate('');

    useEffect(() => {
        const auth = localStorage.getItem("user");
        if (auth) {
            navigate("/login");
        }
    })

// Here we login to the website and store the credential to localstorage
    const handleLogin = async () => {
        try {
            setLoader(true);
            console.warn("Email,Password :::::>>>>", email, password);
            let result = await fetch("http://localhost:7000/login", {
                method: 'post',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json'
                },
            })


            result = await result.json();
            console.warn(result);
            if (result.name) {
                localStorage.setItem("user", JSON.stringify(result));
                setLoader(false);
                navigate("/");

            }
            else {
                setLoader(false);
                alert("Please enter valid credential");

            }
        } catch (e) {
            setLoader(false);
            alert("Something went wrong please try again");
        }

    }

    return (
        <div className='login'>
            <h1>Login</h1>
            <input type='text' className='inputBox' placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className='passClass'>
                <input type={showPassword ? 'text' : 'password'} className='inputBox' placeholder='Enter Password'
                    onChange={(e) => setPassword(e.target.value)} value={password} />
                {showPassword ? <VisibilityIcon style={{ position: "absolute", top: "5px", right: "30px", cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)} /> : <VisibilityOffIcon style={{ position: "absolute", top: "5px", right: "30px", cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)} />}
            </div>
            <button onClick={handleLogin} className="appButton" type='button'>Login</button>
            {loader && <Box sx={{ display: 'flex' }}>
                <CircularProgress />
            </Box>}
        </div>
    )
}

export default Login;