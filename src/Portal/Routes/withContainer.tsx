import React from 'react'
import Contain from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

const Breadcrums = (path: string[]) => {
    let Path = []
    for (let index = 0; index < path.length; index++) {
        const text = path[index];
        if (index === 0)
            Path.push(<Link underline="hover" color="inherit" href="#">
                {text}
            </Link>
            )
        else if (index + 1 === path.length)
            Path.push(
                <Typography color="text.primary">{text}</Typography>
            )
        else
            Path.push(
                <Link
                    underline="hover"
                    color="inherit"
                    href="#"
                >
                    {text}
                </Link>
            )

    }
    return Path
}

const Container = (Component: React.ElementType, path: string[]) => (props: any) => {

    return (
        <Contain fixed sx={{ marginTop: 1 }}>
            <Breadcrumbs aria-label="breadcrumb">
                {Breadcrums(path)}
            </Breadcrumbs>
            <Component />
        </Contain>
    )
}
export default Container