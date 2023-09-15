import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import validation from "./LoginValidation"
import axios from 'axios';
import './Login.css';

function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput =(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(validation(values));
        if(errors.email === "" && errors.password === "")
        {
          axios.post('http://localhost:8081/login', values)
            .then(res => {
               if(res.data === "Success"){
                    navigate('/home');
               }
               else{
                    alert("No record existed");
               }
            })
            .catch(err => console.log(err));
        }
    }
    const handleAdminLogin = () => {
        const adminCredentials = {
          email: 'admin@aha.com',
          password: 'IamtheBoss@619' // Change this to your admin password
        };
      
        // Check if the entered credentials match the admin credentials
        if (values.email == adminCredentials.email && values.password == adminCredentials.password) {
          // Redirect to the admin dashboard or admin pages
          navigate('/admin-home'); // Update the route as needed
        } else {
          alert('Invalid admin credentials');
        }
      };      
    return (
        <div className= 'login-container'>
             <header className="header-signup-login">
      <div className="container">
      <div className="logo">
      <Link to="/">
            <img className="logo-image" src="./AhaLogo2.JPG" width = '30px' height = '30px' alt="Aha Restaurant Logo" /> {/* Use the image as the logo */}
       </Link>
        </div>
        <nav className="navbar">
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
          </ul>
        </nav>
      </div>
    </header>
            <div className='bg-white p-3 rounded w-25 align-right'>
                <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' name='email'
                    onChange={handleInput} className='form-control'/>
                    {errors.email && <span className="text-danger"> {errors.email} </span>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' name='password'
                    onChange={handleInput} className='form-control'/>
                    {errors.password && <span className="text-danger"> {errors.password} </span>}
                </div>
                <button type='submit' className="btn btn-success w-100">Log in</button>
                <p>You are agree to our terms and policies</p>
                <Link to="/signup" className="btn btn-primary border w-100 ">Create Account</Link>

                {/* Add the Admin Login button */}
                <button onClick={handleAdminLogin} className="btn btn-warning w-100 mt-3">Admin Login</button>
                </form>
            </div>
        </div>
    )
}
export default Login