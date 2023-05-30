import React, { useState } from "react"
import { Link } from "react-router-dom"
function Login() {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const handleInput =(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit =(event) => {
        event.preventDefault();
    }
    return (
        <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <form action="">
                <div className="mb-3">
                    <label htmlFor="email"><strong>Email</strong></label>
                    <input type="email" placeholder='Enter Email' 
                    onChange={handleInput} className='form-control'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password"><strong>Password</strong></label>
                    <input type="password" placeholder='Enter Password' 
                    onChange={handleInput} className='form-control'/>
                </div>
                <button className="btn btn-success w-100">Log in</button>
                <p>You are agree to our terms and policies</p>
                <Link to="/signup" className="btn btn-default border w-100 bg-light">Create Account</Link>
                </form>
            </div>
        </div>
    )
}
export default Login