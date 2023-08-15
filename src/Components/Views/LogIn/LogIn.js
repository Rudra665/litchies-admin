import React, { useState } from 'react'
import './LogIn.css'
import { useNavigate } from 'react-router-dom';

const SignIn=()=>{
    let navigate = useNavigate();
    const [state, setState] = React.useState({
        email:'',
        password:''
    })

    const handleChange = (e) => {
        const value = e.target.value;
        setState({
          ...state,
          [e.target.name]: value,
        });
      };

    const handleSubmit = (event) => {
    event.preventDefault();
    if(state.email === "admin" && state.password==="admin")   
     { 
        navigate("/admin/*") 
        // alert("logged In")
    } 
};
	return(
        <div className='background'>
		<div className="wrapper">
            <h2>LOGIN</h2>
            <div className="group">
                <input
                    type="text"
                    size="30"
                    id="email"
                    className="input"
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="email" className="label">
                    Email
                </label>
            </div>
            <div className="group">
                <input
                    type="password"
                    minLength="8"
                    className="input"
                    id='password'
                    name="password"
                    onChange={handleChange}
                    value={state.password}
                    required
                />
                    
                <label htmlFor="password" className="label"  >
                    Password
                </label>
            </div>
            <button type="submit" className="btn" onClick={handleSubmit}>
                <span>LOGIN</span>
            </button>
            <span className="footer"></span>
        </div>
        </div>
	)
}

export default SignIn   