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
    return (
        <div className= 'login-container'>
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
                </form>
            </div>
        </div>
    )
}
export default Login