import React from 'react';

import { AppBar, Toolbar, IconButton, MenuItem, Menu, Badge, Typography } from '@material-ui/core';

import { ShoppingCart } from '@material-ui/icons';

import logo from '../../assests/logo.jpg';
import useStyles from './styles';

import {Link, useLocation} from 'react-router-dom';

const NavBar = ({ totalItems }) => {

    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position='fixed' className={classes.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt='logo image' height='25px' className={classes.image} />
                        HighCart
                    </Typography>
                    <div className={classes.grow} />
                    { location.pathname === '/' && (
                    <div className={classes.button}>                        
                        <IconButton component={Link} to='/cart' aria-label='Show cart Items' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                    </div>)}
                </Toolbar>
            </AppBar>
        </>
    );
}

export default NavBar;