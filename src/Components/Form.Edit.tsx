import React from 'react'
import { useForm, Controller, UseControllerProps } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
export type DataType = {
    [tabName: string]: {
        fields?: {
            name: string,//object name
            label: string,
            defaultValue?: string
            rules?: UseControllerProps['rules'],
            sx?: BaseTextFieldProps['sx']
        }[],
        table?: {}
    }
}
type Entries<T> = {
    [K in keyof T]: [K, T[K]];
}[keyof T][];

export default function FormEdit({ onFetch, onSubmit }: {
    onFetch: () => Promise<DataType>
    onSubmit: (data: object) => Promise<void>
}) {
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit, getValues } = useForm();
    const [tabSelected, setTabSelected] = React.useState(0);

    const changeTab = (event: React.SyntheticEvent, newTab: number) => {
        setTabSelected(newTab);
    };
    // const tabs = Object.entries(data)
    const [tabs, setTabs] = React.useState<Entries<DataType>>()
    React.useEffect(() => {
        fetchData();
    }, []);

    async function fetchData() {
        const data = await onFetch() as DataType
        setTabs(Object.entries(data))
    }
    async function submit(data: any) {
        setLoading(true)
        await onSubmit(data)
        setLoading(false)
    }
    if (tabs === undefined)
        return <div>loading</div>
    else
        return (
            <Box
                component="form"
                sx={{
                    paddingTop: 2,
                    '& .MuiTextField-root': { m: 1, width: '25ch' },

                }}
                autoComplete="off"
                onSubmit={handleSubmit(submit)}
            // noValidate
            >
                <Box sx={{ '& > button': { m: 1 } }}>
                    <LoadingButton
                        color="primary"
                        // color="secondary"
                        // onClick={handleClick}
                        type="submit"
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                    >
                        Save
                    </LoadingButton>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabSelected} onChange={changeTab} aria-label="basic tabs example">
                            {tabs.map(([key, value], index) => {
                                return (
                                    <Tab label={key} {...a11yProps(index)} />
                                )
                            })}
                        </Tabs>
                    </Box>
                    {tabs.map(([key, value], index) => {
                        return (
                            <TabPanel tabSelected={tabSelected} index={index}>
                                {
                                    value?.fields &&
                                    value.fields.map(
                                        (e) => <Controller
                                            name={e.name}
                                            control={control}
                                            defaultValue={e?.defaultValue || ""}
                                            rules={e?.rules || {}}
                                            // rules={{ required: 'Nombre requerido' }}
                                            render={({ field, fieldState: { error } }) => <TextField
                                                {...field}
                                                label={e.label}
                                                error={!!error}
                                                helperText={error ? error.message : null}
                                                sx={e?.sx || {
                                                    width: '100ch'
                                                }}
                                            />}
                                        />
                                    )
                                }
                            </TabPanel>
                        )
                    })}

                    <TabPanel tabSelected={tabSelected} index={1}>
                        Item Two
                    </TabPanel>
                    <TabPanel tabSelected={tabSelected} index={2}>
                        Item Three
                    </TabPanel>
                </Box>

            </Box>

        )
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    tabSelected: number;
}
function TabPanel(props: TabPanelProps) {
    const { children, tabSelected, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={tabSelected !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {tabSelected === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}