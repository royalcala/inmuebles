import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuContext } from './MenuDrawerLeft'
import { Link as RouterLink } from 'react-router-dom';
export function LinkButton({
    Icon, pl, route, text
}: {
    Icon: React.ElementType,
    pl: number,
    route: string,
    text: string
}
) {
    const menuContext = React.useContext(MenuContext);
    return (
        <ListItemButton sx={{ pl: pl }} component={RouterLink} to={route}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText
                primary={text}
                onClick={() => {
                    menuContext.toggleDrawer(false)
                }}
            />
        </ListItemButton>
    )
}