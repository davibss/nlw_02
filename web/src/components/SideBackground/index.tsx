import React from 'react';

import './styles.css'

import backgroundDecorations from '../../assets/images/success-background.svg';
import logoProffy from '../../assets/images/logo.svg';

interface SideBackgroundProps {

}

const SideBackground: React.FunctionComponent<SideBackgroundProps> = () => {
    return (
        <div className="background-main">
            <img src={backgroundDecorations} alt="Background" className="side-background-image"/>
            <div className="background-image">
                <img src={logoProffy} alt="Proffy Logo" className="side-background-logo"/>
                <p className="side-background-text">Sua plataforma de estudos online.</p>
            </div>
        </div>
    );
}

export default SideBackground;