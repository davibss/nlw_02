import React from 'react';

import './styles.css';
import { Link } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import returnIcon from '../../assets/images/icons/back.svg';
import rocketIcon from '../../assets/images/icons/rocket-green.svg';
import smileIcon from '../../assets/images/icons/smile-glass.svg';

export enum SubdescriptionType {
    TeacherList,
    TeacherForm
}
interface PageHeaderProps {
    title: string;
    description?: string;
    subdescriptionType?: SubdescriptionType;
    totalProffys?: Number;
}

const PageHeader: React.FunctionComponent<PageHeaderProps> = (props) => {
    return (
        <header className="page-header">
            <div className="top-bar-container">
                <Link to="/">
                    <img src={returnIcon} alt="Voltar"/>
                </Link>
                <img src={logoImg} alt="Proffy"/>
            </div>   
            <div className="header-content">
                <div className="header-content-header">
                    <div className="header-content-title">
                        {/* <strong>{props.title}</strong> */}
                        <p className="title">{props.title}</p>
                        {props.description && <p>{props.description}</p>}
                    </div>
                    {<div className="subdescription">
                        {props.subdescriptionType === SubdescriptionType.TeacherForm ?
                        <div>
                            <img src={rocketIcon} alt=""/>
                            <p>Prepare-se! Vai ser o máximo.</p>
                        </div>
                        :
                        <div>
                            <img src={smileIcon} alt=""/>
                            <p>Nós temos {props.totalProffys} professores.</p>
                        </div>
                        }
                    </div>
                    }
                </div>
                {props.children}
            </div>
        </header>
    );
}

export default PageHeader;