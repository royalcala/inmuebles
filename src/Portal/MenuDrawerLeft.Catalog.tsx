import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

import MenuProperty from './MenuDrawerLeft.Catalog.Propery'
import MenuCompany from './MenuDrawerLeft.Catalog.Company'

export default function MenuPublic() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <ListItemButton onClick={() => {
                setOpen(!open);
            }}>
                <ListItemIcon>
                    <LibraryBooksIcon />
                </ListItemIcon>
                <ListItemText primary="Catalogos" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <MenuCompany/>
                <MenuProperty />
            </Collapse>
        </>
    )
}