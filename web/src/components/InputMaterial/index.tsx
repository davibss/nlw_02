import React, { InputHTMLAttributes } from 'react';
import { TextField } from '@material-ui/core';

interface InputMaterialProps extends InputHTMLAttributes<HTMLInputElement>{
    labelInput: string;
    idInput: string;
    typeInput: string;
}

const InputMaterial: React.FunctionComponent<InputMaterialProps> = ({onChange,labelInput, idInput, typeInput}) => {
    return (
        <TextField 
            label={labelInput} 
            id={idInput} 
            type={typeInput}
            variant="filled"
            fullWidth={true}
            autoComplete="off"
            style={{marginTop: '0.4rem'}}
            InputProps={{
                onChange: onChange === undefined ? () => {} : onChange,
                style: {
                    backgroundColor: '#FFF',
                    fontSize: '1.6rem',
                },
                disableUnderline: true,
            }}
            InputLabelProps={{
                style: {
                    fontSize: '1.4rem'
                }
            }}
        />
    );
}

export default InputMaterial;