import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Grid } from '@material-ui/core';

const FormInput = ({ name, label, required }) => {
    const { control } = useForm();
    return (
        <Grid item xs={12} sm={6}>
            <Controller 
                as={TextField}
                name={name}
                control={control}
                label={label}
                required={required}
                fullWidth
            />
        </Grid>
    );
}

export default FormInput;