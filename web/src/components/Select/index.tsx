import React, {SelectHTMLAttributes} from 'react';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>{
    label: string;
    name: string;
    options: Array<{
        value: string,
        label: string
    }>;
}

const Select: React.FunctionComponent<SelectProps> = ({label, name, options, ...rest}) => {
    return (
        <div className="select-block">
            <label htmlFor={name}>{label}</label>
            <select value="" id={name} {...rest}>
                <option value="">Selecione uma opção</option>
                {options.map(element => 
                <option 
                    key={element.value} 
                    value={element.value}>{element.label}
                </option>)}
            </select>
        </div>
    );
}

export default Select;