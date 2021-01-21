import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

// Forma de importar imagens, pois o html abaixo não aceita "/imagem.png"...
// Para colocar variável no html abaixo é necessário chaves: {variavel}
// A class do  html é chamada de className pois 'class' é uma palavra reservada
import logoIMG from '../../assets/images/logo.svg';
import landingIMG from '../../assets/images/landing.svg';
import logoutIcon from '../../assets/images/icons/logout.svg';

import studyIcon from '../../assets/images/icons/study.svg';
import giveClassesIcon from '../../assets/images/icons/give-classes.svg';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';

import './styles.css';
import api from '../../services/api';
import {useAuth} from '../../contexts/auth';

interface SimpleUserData {
    name: string;
    avatar: string;
}

function Landing(){
    const [totalConnections, setTotalConnections] = useState(0);
    const [userName, setUserName] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const {signOut,userId} = useAuth();

    useEffect(() => {
        api.get('/connections')
            .then(response => {
                setTotalConnections(response.data.total);
            });
        api.get(`/user-simple-profile/${userId}`)
            .then(response => {
                const {avatar, name} = response.data as SimpleUserData;
                setUserName(name);
                setUserAvatar(avatar);
            });
    }, [userId]);

    function handleLogoutClick() {
        if (window.confirm('Tem certeza que quer sair?')){
            signOut();
        }
    }

    return (
        <div id="page-landing">
            <div className="page-landing-header">
                <Link to="/user-profile" className="card-user">
                    <img src={userAvatar} alt=""/>
                    <p>{userName}</p>
                </Link>
                <Link to="#" className="logout-button" onClick={handleLogoutClick}>
                    <img src={logoutIcon} alt="logout"/>
                </Link>
            </div>
            <div id="page-landing-content" className="container">
                
                <div className="logo-container">
                    <img src={logoIMG} alt="Proffy"/>
                    <h2>Sua plataforma de estudos online</h2>
                </div>
                <img 
                    src={landingIMG} 
                    alt="Plataforma de Estudos" 
                    className="hero-image"
                />
                {/* <div className="page-landing-content-header"></div> */}
            </div>
            <div className="page-landing-content-buttons">
                    <div className="buttons-container">
                        <div className="buttons-container-welcome">
                            <p>Seja bem-vindo</p>
                            <p><strong>O que deseja fazer?</strong></p>
                        </div>
                        <span className="total-connections">
                            <p>Total de {totalConnections} conexões já realizadas
                                <img src={purpleHeartIcon} alt="Coração Roxo"/>
                            </p>
                        </span>
                        <Link to="/study" className="study">
                            <img src={studyIcon} alt="Estudar"/>
                            Estudar
                        </Link>
                        <Link to="/give-classes" className="give-classes">
                            <img src={giveClassesIcon} alt="Dar Aula"/>
                            Dar aulas
                        </Link>
                    </div>
            </div>
        </div>
    );
}

export default Landing;