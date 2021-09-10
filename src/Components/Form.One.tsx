import React from 'react'
import { useForm, Controller, UseControllerProps } from "react-hook-form";
import Box from '@mui/material/Box';
import TextField, { BaseTextFieldProps } from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SaveIcon from '@mui/icons-material/Save';

export type PropsFormOne = {
    fields: {
        nameDB: string,
        label: string,
        defaultValue?: string
        rules?: UseControllerProps['rules'],
        sx?: BaseTextFieldProps['sx']
    }[]
}
export default function FormOne({ data }: {
    data: PropsFormOne
}) {
    const [loading, setLoading] = React.useState(false);
    const { control, handleSubmit, getValues } = useForm();

    async function onSubmit(data: any) {
        alert(data)
        // setProgress(true)
        // const resp = await fetch('/api/admin/users/new', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(data)
        // })
        // const json = await resp.json();
        // setProgress(false)
        // if (json.success === true) {
        //   setMsgDialog("User Created")
        //   const user = json.data as Users
        //   setLinkToUser(user.id)
        // }
        // else
        //   setMsgDialog("error:" + json.msg)
        // setDialog(true)
    }
    return (
        <Box
            component="form"
            sx={{
                paddingTop: 2,
                '& .MuiTextField-root': { m: 1, width: '25ch' },

            }}
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
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
            {data.fields.map(
                (e) => <Controller
                    name={e.nameDB}
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
            )}

        </Box>
    )
}