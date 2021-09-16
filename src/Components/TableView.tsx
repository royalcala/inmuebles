import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TablePagination } from '@mui/material';
import TableRow from '@mui/material/TableRow';
import { useForm, Controller } from "react-hook-form";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';



function FilterButton() {
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    // return <span>{`theme.breakpoints.up('sm') matches: ${matches}`}</span>;
    if (matches)
        return <Button color="primary" >Filter</Button>
    else
        return <></>

}
export default function List(props: {
    optionsColumn: boolean,
    api: string,
    head: {
        label: string,
        filter: (value: any) => object
    }[],
    row: (document: any, index: number) => JSX.Element,
    initialDocs: any[],
    totalRows: number
}) {
    const { control, handleSubmit, getValues } = useForm();    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [docs, setDocs] = React.useState(null)
    const [filter, setFilter] = React.useState({})

    useEffect(() => {
        async function fetchMyAPI() {
            const resp = await fetch(props.api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    limit: rowsPerPage,
                    offset: page * rowsPerPage,
                    filter
                })
            })
            const json = await resp.json();
            setDocs(json)
        }

        fetchMyAPI()
    }, [filter, page, rowsPerPage])

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const onFilter = async () => {
        const mongoFilter = Object.entries(getValues()).map(
            ([key, value], index) => {
                if (value === '')
                    return null
                else
                    return props.head[index].filter(value)
            }
        ).filter(
            (value) => value !== null
        ).reduce(
            (prev, current) => ({
                ...prev,
                ...current
            }), {}
        )
        setFilter(mongoFilter || {})
    }


    return (
        <>
            <FilterButton />
            <Paper >
                <TableContainer>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {props.optionsColumn && <TableCell />}                            
                                {props.head.map(
                                    ({ label }, index) => <TableCell
                                        key={index}
                                        // align="right"
                                        style={{ minWidth: 170 }}
                                    >
                                        <Controller
                                            name={label}
                                            control={control}
                                            defaultValue=""
                                            render={({ field, fieldState: { error } }) => <TextField
                                                {...field}
                                                label={label}                                               
                                                onKeyDown={(e: any) => {
                                                    if (e.key === 'Enter') {
                                                        onFilter()
                                                    }
                                                }}
                                            />}
                                        />
                                    </TableCell>
                                )}
                                {/* {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))} */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {docs === null
                                ? props.initialDocs.map(
                                    (doc, index) => {
                                        return props.row(doc, index)
                                    }
                                )
                                //@ts-ignore
                                : docs.map(
                                    (doc: any, index: number) => {
                                        return props.row(doc, index)
                                    }
                                )

                            }
                            {/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number' ? column.format(value) : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })} */}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination                
                    count={props.totalRows}
                    onPageChange={handleChangePage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[25, 50, 100]}
                    component="div"
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}