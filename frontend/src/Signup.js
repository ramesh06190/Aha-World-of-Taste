import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import validation from "./SignupValidation";
import axios from 'axios';
import './Signup.css';

function Signup() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    })
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const handleInput =(event) => {
        setValues(prev => ({...prev, [event.target.name]: [event.target.value]}))
    }
    const handleSubmit =(event) => {
        event.preventDefault();
        setErrors(validation(values));
        if(errors.name === "" && errors.email === "" && errors.password === "")
        {
          axios.post('http://localhost:8081/signup', values)
            .then(res => {
                console.log(res);
                navigate('/');
            })
            .catch(err => console.log(err));
        }

    }

    return(
        <div className='signup-container'>
            <div className='bg-white p-3 rounded w-45 align-right'>
                <form action="" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name"><strong>Full Name</strong></label>
                    <input type="text" placeholder='Enter Name' name='name'
                    onChange={handleInput} className='form-control'/>
                    {errors.name && <span className="text-danger"> {errors.name} </span>}
                </div>
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
                <div className="mb-3">
                    <label htmlFor="phone"><strong>Phone Number</strong></label>
                    <input type="text" placeholder='Enter Phone Number' name='phone' maxLength={10} minLength={10}
                    onChange={handleInput} className='form-control'/>
                </div>
                <div className="mb-3">
                    <label htmlFor="address"><strong>Address</strong></label>
                    <input type="text" placeholder='Address Line 1, City, State, Zipcode' name='address'
                    onChange={handleInput} className='form-control'/>
                </div>
                <button type='submit' className="btn btn-success w-100">Sign up</button>
                <p>You are agree to our terms and policies</p>
                <Link to="/" className="btn btn-primary border w-100 ">Login</Link>
                </form>
            </div>
        </div>
    )    
}
export default Signup