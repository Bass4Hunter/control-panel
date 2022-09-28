import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

type Props = {
    label: string,
    options: Array<string>,
    onChange: any,
    clear: boolean
}

const SelectInput = React.memo((props: Props) => {
    const [value, setLabel] = React.useState<string>('')

    const handleChange = (event: SelectChangeEvent) => {
        setLabel(event.target.value as string)
    };

    React.useEffect(() => {
        setLabel('')
        props.onChange('')
    }, [props.options, props.clear])

    React.useEffect(() => {
        props.onChange(value)
    }, [value])

    return <Box
        component="form"
        sx={{ m: 2 }}
        noValidate
        autoComplete="off"
    >
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={value}
                label={props.label}
                onChange={handleChange}
            >
                {
                    props.options.map((e, i) =>
                        <MenuItem key={'MenuItem' + e + i} value={e}>
                            {e}
                        </MenuItem>
                    )
                }
            </Select>
        </FormControl >
    </Box>
})

export default SelectInput