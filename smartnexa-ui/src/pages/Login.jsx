import { useEffect, useState } from "react";
import React from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './css/Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import ShowPasswordIcon from './icons/show-password.svg'
import HidePasswordIcon from './icons/hide-password.svg'
import IntroImage from './images/intro-img.jpeg'

let data = {}
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const navigate = useNavigate(); 
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
      setShowPassword((prevShowPassword) => !prevShowPassword);
    };
  
    useEffect(() => {
      const accessToken = localStorage.getItem('access');
  
      // Function to verify the token
      const verifyToken = async () => {
        if (!accessToken) {
          navigate('/login');
          return; // Exit if there's no token
        }
  
        try {
          const data = { access: accessToken };
          const response = await fetch('http://127.0.0.1:8000/api/user/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization':'Bearer '+accessToken
            },
            body: JSON.stringify(data),
          });
  
          // Check if the response is OK
          if (response.ok) {
            navigate('/home');
          }
          else{
            localStorage.removeItem('refresh');
            localStorage.removeItem('access');
            localStorage.removeItem('userType');
          }
        } catch (err) {
        
          // console.error(err);
        }
      };
  
      verifyToken(); // Call the async function
  
    }, []); 
    
    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!username || !password){
            setError("Please fill both fields!");
            return;
        };

        data={
            "username":username,
            "password":password
        }

        setError('');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                
              },
              body: JSON.stringify(data),
            });
      
            // Check if the response is OK
            if (!response.ok) {
              alert("Incorrect Username or Password");
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
      
            const result = await response.json();
            localStorage.setItem('refresh', result.refresh);
            localStorage.setItem('access', result.access);
            localStorage.setItem('userType', result.type);
            navigate('/Home')
          } catch (err) {
            setError(err);
          } finally {
            // setLoading(false);
          }
    }

  return (
    <>
        <div className='layout-wrapper'>
            <div className="row d-flex">
              <div className="brand-container col-md-6">
                {/* <h1>SmartNexa</h1> */}
                <div className="img-container mt-1 ms-1">
                  <img src={IntroImage} alt="" className="intro-img"/>
                </div>
              </div>
              <div className="login-content-wrapper col-md-6">
                <h2 className="brands-name text-center mt-2 mb-5">SmartNexa</h2>
                <h3 className="text-center">Welcome back!</h3>
                <p className="text-center">We are glad to see you again.</p>
                <div className="login-container">
                  {/* <h3 className="text-center">Sign in</h3> */}
                  <div className="login-form d-flex flex-column justify-content-center align-items-center">
                    <form className="d-flex flex-column align-items-start">
                        <label htmlFor="email/username">Email/Username</label>
                        <input type="text" id="email/username" className="mb-4" name="username" onChange={(e) => setUsername(e.target.value)} value={username}/>
                        <label htmlFor="password">Password</label>
                        <div className="password-inputgroup-login">
                          <input type={showPassword ? "text" : "password"} id="password" name="password" onChange={(e) => setPassword(e.target.value)} value={password} />
                          <span onClick={handleTogglePassword}>
                            <img 
                              src={showPassword ? HidePasswordIcon : ShowPasswordIcon}
                              alt={showPassword ? "Hide password" : "Show password"}
                            />
                          </span>
                        </div>
                        <div>{error}</div>
                        <button onClick={handleSubmit} className="login-btn mt-4">Sign in</button>
                    </form>
                    <div className="auth-links d-flex flex-column align-items-start mt-3">
                      <p className="text-start">Don't have an account <Link to='/signup'>Sign Up</Link></p>
                      <p className="">Forgot Password? <Link to='/forgot-password'>Reset</Link></p>
                    </div>
                  </div>
                </div>
              </div>
              
            </div>
            {/* <footer>
                <p>© 2021 SmartNexa. All rights reserved</p>
            </footer> */}
        </div>
    </>
  )
}

export default Login