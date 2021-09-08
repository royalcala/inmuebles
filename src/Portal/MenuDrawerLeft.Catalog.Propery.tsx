import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import HomeIcon from '@mui/icons-material/Home';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import { Link as RouterLink } from 'react-router-dom';
import { MenuContext } from './MenuDrawerLeft'
export default function Menu() {
    const [open, setOpen] = React.useState(false);
    const menuContext = React.useContext(MenuContext);
    return (
        <>
            <ListItemButton onClick={() => {
                setOpen(!open);
            }}
                sx={{ pl: 4 }}
            >
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Propiedades" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 6 }} component={RouterLink} to="/catalogs/property/new">
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary="Nueva Propiedad"
                            onClick={() => {
                                menuContext.toggleDrawer(false)
                            }}
                        />
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    )
}