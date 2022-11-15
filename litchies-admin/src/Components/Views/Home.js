import React from 'react'
import Logo from "../Images/logo/litchies_logo.png"
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
const Home = () => {
    return (
        <div >
            <Box display="flex" justifyContent="center" sx={{ paddingBlockStart: 24 }}>
                <img src={Logo} alt="img" width="50%" height="100%"></img>
            </Box>
            <Box align="center" sx={{ marginTop: 4 }}>
                <Typography variant='h1'>
                    Welcome to Litchies!
                </Typography>
            </Box>
        </div >
    )
}

export default Home

