import React from 'react';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import returnIcon from '../../assets/images/icons/back.svg';

import './styles.css';

interface SimpleHeaderProps {
    title: string;
}

const SimpleHeader: React.FunctionComponent<SimpleHeaderProps> = ({title}) => {
    return (
        <div className="simple-header">
            <Link to="/" className="simple-header-goback">
                <img src={returnIcon} alt="Voltar"/>
            </Link>
            <h3 className="simple-header-title">{title}</h3>
            <img src={logoImg} alt="Proffy" className="simple-header-logo"/>
        </div>
    )
}

export default SimpleHeader;