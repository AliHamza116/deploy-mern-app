import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { handleError, handleSuccess } from '../utils'

function Login() {

    const [ loginInfo, setLoginInfo ] = useState({
        email:'',
        password:''
    })
    
    const navigate = useNavigate()
    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log( name, value );
        const copyloginInfo = { ...loginInfo };
        copyloginInfo[name] = value;
        setLoginInfo(copyloginInfo)
    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        const { email, password } = loginInfo;
        if(!email || !password){
            return handleError('email and password are required')
        }
        try {
            const url = "http://localhost:5000/auth/login";
            const response = await fetch(url,{
                method: "post",
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginInfo)
            });
            const result = await response.json();
            const { success, message, jwtToken, name, error } = result;
            if(success){
                handleSuccess(message);
                localStorage.setItem('token', jwtToken)
                localStorage.setItem('loggedInUser', name)
                setTimeout(()=>{
                    navigate('/home')
                },1000)
            }else if(error){
                const details = error?.details[0].message;
                handleError(details);
            }else if(!success){
                handleError(message);
            }
            console.log(result);
        } catch (error) {
            handleError(err);
        }
    }
  return (
    <div className='container'>
        <h1>login</h1>
        <form action="" onSubmit={handleLogin}>
            <div>
                <label htmlFor="email">Email</label>
                <input 
                onChange={handleChange}
                type="email" 
                name='email' 
                autoFocus 
                placeholder='Enter your email...'
                value={loginInfo.email}
                />
            </div>
            <div>
                <label htmlFor="passwotd">Password</label>
                <input 
                onChange={handleChange}
                type="password"
                 name='password' 
                 autoFocus 
                 placeholder='Enter your passwotd...'
                 value={loginInfo.password}
                 />
            </div>
            <button type='submit'>login</button>
            <span>Don't have an account ?
                <Link to="/signup">Signup</Link>
            </span>
        </form>
        <ToastContainer/>
    </div>
  )
}

export default Login