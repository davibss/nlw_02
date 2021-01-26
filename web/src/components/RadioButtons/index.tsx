import React from 'react';
import './styles.css';

import {ReactComponent as StudentIcon} from '../../assets/images/icons/student.svg';
import {ReactComponent as ProffyIcon} from '../../assets/images/icons/student.svg';

interface RadioButtonsProps {
    proffy: boolean;
    setProffy: React.Dispatch<React.SetStateAction<boolean>>;
}

const Register: React.FunctionComponent<RadioButtonsProps> = ({proffy,setProffy}) => {

    function enableDisable(value: boolean) {
        return value ? "disable" : "enable";
    }

    return (
        <div className="select-buttons">
            <div className={`container-selection ${enableDisable(proffy)}`} 
                onClick={_ => setProffy(false)}>
                <StudentIcon className={`${enableDisable(proffy)}`}/>
                <span className={`${enableDisable(proffy)}`}>Aluno</span>
            </div>
            <div className={`container-selection ${enableDisable(!proffy)}`}
                onClick={_ => setProffy(true)}>
                <ProffyIcon className={`${enableDisable(!proffy)}`}/>
                <span className={`${enableDisable(!proffy)}`}>Professor</span>
            </div>
        </div>
    );
}

export default Register;