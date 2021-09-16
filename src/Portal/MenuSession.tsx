import React, { useEffect, useState } from 'react';
import { Auth, Hub } from 'aws-amplify';
import AccountCircle from "@mui/icons-material/AccountCircle";
import IconButton from "@mui/material/IconButton";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FacebookIcon from '@mui/icons-material/Facebook';
import { GlobalContext } from '../App';


export default function MenuSession() {
    const globalContext = React.useContext(GlobalContext)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
        // handleMobileMenuClose();
    };

    const menuId = 'primary-search-account-menu';
    if (globalContext.user)
        return (
            <>
                <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    id={menuId}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={isMenuOpen}
                    onClose={handleMenuClose}
                >
                    <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={async () => {
                        await Auth.signOut();
                        handleMenuClose()
                    }}>Cerrar Sesion</MenuItem>
                </Menu>
            </>
        )
    else
        return (
            <Button
                color="inherit"
                //  className={classes.buttonLogin}
                startIcon={<FacebookIcon />}
                onClick={() => {
                    //@ts-ignore
                    Auth.federatedSignIn({ provider: 'Facebook' })
                }}>
                Login
            </Button>
        )

}