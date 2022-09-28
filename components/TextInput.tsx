import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

type Props = {
    label: string,
    onChange: any,
    clear: boolean
}

export default function TextInput(props: Props) {
    const [value, setValue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value as string)
    };
    React.useEffect(() => {
        props.onChange(value)
    }, [value])

    React.useEffect(() => {
        setValue('')
    }, [props.clear])

    return <Box
        component="form"
        sx={{ m: 2 }}
        noValidate
        autoComplete="off"
    >
        <TextField id="outlined" value={value} label={props.label} variant="outlined" onChange={handleChange} />
    </Box>
}