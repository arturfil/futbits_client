import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

interface Props {
    state: Object;
    keyName: string;
    setState: Function;
    title: string;
    values: any[]
}

export default function CustomSelector({setState, state, title, keyName, values}: Props) {
  return (
    <FormControl fullWidth>
        <InputLabel>{title}</InputLabel>
        <Select
            defaultValue="choose"
            label={title}
            onChange={(e) => setState({...state, [keyName]: e.target.value})}
        >
            <MenuItem disabled value="choose">Choose Option</MenuItem>
            {values?.map(val => (
                <MenuItem value={val} key={val}>{val}</MenuItem>
            ))}
        </Select>
    </FormControl>
  )
}
