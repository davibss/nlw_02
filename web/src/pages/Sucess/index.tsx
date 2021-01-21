import React from 'react';

import './styles.css';
// import SideBackground from '../../components/SideBackground';
import {CheckBoxOutlined} from '@material-ui/icons';

import backgroundDecorations from '../../assets/images/success-background.svg';
import { Link } from 'react-router-dom';

interface SucessProps{
    title: string;
    subtitle: string;
    buttonTitle: string;
}

const Sucess: React.FunctionComponent<SucessProps> =  ({title,subtitle, buttonTitle}) => {
    return (
        <div>
            <div className="background-main">
                <img src={backgroundDecorations} alt="Background" className="side-background-image"/>
                <div className="background-image">
                    <CheckBoxOutlined style={{
                        width: "14rem",
                        height: "14rem",
                        color: "var(--color-secundary)"
                    }}/>
                    {/* <img src={logoProffy} alt="Proffy Logo" className="side-background-logo"/> */}
                    {/* <p className="side-background-text">Sua plataforma de estudos online.</p> */}
                    <h1 className="sucess-title">{title}</h1>
                    <p className="sucess-text">{subtitle}</p>
                    <Link to="/" className="sucess-button">{buttonTitle}</Link>
                </div>
            </div>
        </div>
    )
}

export default Sucess;