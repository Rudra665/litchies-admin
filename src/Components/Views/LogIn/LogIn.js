import React, { useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './LogIn.css'

import { useNavigate } from 'react-router-dom';
import { Button, TextField, Typography } from '@mui/material';

const theme = createTheme({
    palette: {
      primary:{
        main:"#1565c0"
      } ,
      secondary:{
        main:"#f9003b"
      } ,
    },
  });

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
    else{
      alert("Wrong Credentials! try again")

    }
};
	return(
        <ThemeProvider theme={theme}>

        <div className='background'>
        <Typography variant='h3' textAlign='center' color='white' sx={{pt:6, pl:4}}>Welcome To <span style={{color:'#f9003b'}}>Litchies</span> Admin</Typography>
            
		<div className="wrapper">
            <div className='SideImage'></div>
            <div className='LoginForm'>
            <h2 className='h3'>LOGIN</h2>
            <div className='Profile' ></div>

            <div className="group">
                <TextField
                    type="text"
                    size="30"
                    id="email"
                    className="input"
                    label="Email"
                    variant="standard"
                    color='secondary'
                    name="email"
                    value={state.email}
                    onChange={handleChange}
                    required
                />
                
            </div>
            <div className="group">
                <TextField
                    type="password"
                    className="input"
                    id='password'
                    name="password"
                    label="Password"
                    variant="standard"
                    color='secondary'
                    onChange={handleChange}
                    value={state.password}
                    required
                />
                    
               
            </div>
            <Button type="submit" className='btn' color='secondary' variant='contained' onClick={handleSubmit}>
                <span>LOGIN</span>
            </Button>
            <span className="footer"></span>
            </div>
        </div>
        </div>
        </ThemeProvider>
	)
}

export default SignIn   