import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import logo2 from "../Images/logo/litchies_logo2.png"
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Link } from "react-router-dom"


const pages = [{ name: 'Home', to: "/Home" }, { name: 'New Requests', to: "/New Requests" }, { name: 'Verified Shops', to: "/Verified Shops" }, { name: 'Blocked Shops', to: "/Blocked Shops" }, { name: 'Create Shop', to: "/Create Shop" }, { name: 'Categories', to: "/Categories" }, { name: 'Reports', to: "/Reports" }];


function ResponsiveAppBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    // const selected = () => {

    // }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };



    return (
        <AppBar position="fixed">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box>
                        <img src={logo2} width="100vh" height="100%" alt="img"></img>
                    </Box>

                    <Box sx={{ flexGrow: 1, justifyContent: "right", display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"

                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted

                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                textDecoration: "none",
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Link to={page.to}>
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page.name}</Typography>
                                    </MenuItem>
                                </Link>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ flexGrow: 1, textDecoration: "none", display: { xs: 'none', md: 'flex' }, justifyContent: "center" }}>
                        {pages.map((page) => (
                            <Link to={page.to} >
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ my: 1, color: 'white' }}
                                >
                                    {page.name}
                                </Button>
                            </Link>
                        ))}
                    </Box>

                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;