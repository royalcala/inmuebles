import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Auth, Hub } from 'aws-amplify';
import FacebookIcon from '@mui/icons-material/Facebook';
import Box from '@mui/material/Box';

export default function ButtonAppBar() {

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar variant="dense">
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Inmuebles
                    </Typography>
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
                </Toolbar>
            </AppBar>
        </Box>
    );
}
