import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PublicIcon from '@mui/icons-material/Public';
import List from '@mui/material/List';
import ListIcon from '@mui/icons-material/List';
import { Link as RouterLink} from 'react-router-dom';
export default function MenuPublic() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <ListItemButton onClick={() => {
                setOpen(!open);
            }}>
                <ListItemIcon>
                    <PublicIcon />
                </ListItemIcon>
                <ListItemText primary="Public" />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} component={RouterLink} to="/public/list">
                        <ListItemIcon>
                            <ListIcon />
                        </ListItemIcon>
                        <ListItemText primary="Lista Propiedades" />
                    </ListItemButton>
                </List>
            </Collapse>
        </>
    )
}