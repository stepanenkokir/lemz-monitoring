import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/AuthContext';
import {Link} from 'react-router-dom'

const pages = [
    {title:'ЭПР СПб', link:'/'},
    {title:'Абу-Даби', link:'/abu'},
    {title:'Сколково', link:'/skolkovo'},
    {title:'Расчёт МПСН', link:'/sandbox'}
    
]    
   

const ResponsiveAppBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const auth = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = (event) => {        
            console.log("Выход!!!");
            event.preventDefault();
            auth.logout();
            navigate('/');
        }  

    return (
        <AppBar position="static" sx={{ background:"#0097A7"}}>           
                <Toolbar disableGutters>                                    
                    <IconButton
                        component={Link}
                        to={'/'}
                        sx={{
                            ml: 2,
                            mr: 4,
                            display: { xs: 'none', md: 'flex' },
                        
                        }}>
                        <img 
                        src="/images/logo.svg" 
                        width="64"
                         />
                    </IconButton>       
                                                          
                        <Typography  
                            component={Link}
                            to={'/'}
                            noWrap                                           
                            sx={{
                                ml: 2,
                                mr: 4,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'serif',
                                fontWeight: 700,
                                fontSize: 32,
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >            
                            МОНИТОРИНГ                        
                        </Typography>
                    
                    <Box 
                        sx={{ 
                            flexGrow: 1, 
                            display: { xs: 'flex', md: 'none' } 
                    }}>
                        <IconButton                            
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon sx={{ fontSize: 40 }}/>
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
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    component={Link}
                                    to={page.link} 
                                    key={page.title} 
                                    onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        {page.title}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>                    
                    <IconButton
                        sx={{display: { xs: 'flex', md: 'none' }}}>
                        <img src="/images/logo.svg" width="32"/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 3,
                            fontFamily: "serif", 
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    Мониторинг
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (                            
                            <Button                            
                                component={Link}
                                to={page.link}
                                key={page.title}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >                                
                                  {page.title}
                            </Button>
                        ))}
                    </Box>
                    
                </Toolbar>            
        </AppBar>
    );
};
export default ResponsiveAppBar;