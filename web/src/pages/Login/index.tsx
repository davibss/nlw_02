import React, { useState } from 'react';

import './styles.css';
import SideBackground from '../../components/SideBackground';
import purpleHeartIcon from '../../assets/images/icons/purple-heart.svg';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/Validator';

import {useAuth} from '../../contexts/auth';

function Login(){
    const [readyRegister, setReadyRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {signIn,signed} = useAuth();
    console.log(signed);

    function handleInputEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (validateEmail(value)){
            setEmail(value);
            if (password !== ''){
                setReadyRegister(true);
            }
        } else {
            setReadyRegister(false);
        }
    }

    function handlePassword(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setPassword(value);
        setReadyRegister(email !== '' && value !== '');
    }

    function handleLoginButton(){
        if (readyRegister){
            signIn(email,password);
        }
    }

    function formPreventDefault(e: React.FormEvent){
        e.preventDefault();
    }
    
    return (
        <div className="page-login">
            <SideBackground />
            <div className="page-login-main">
                <main className="page-login-body">
                    <h1 className="page-login-title">Fazer login</h1>
                    <form action="" className="page-login-form" onSubmit={formPreventDefault} autoComplete="false">
                        <input type="email" className="login-input" placeholder="E-mail" onChange={handleInputEmail}/>
                        <input type="password" className="login-input" placeholder="Senha" onChange={handlePassword}/>
                        <div className="form-password-group">
                            <div className="form-checkbox">
                                <input type="checkbox" name="Lembrar" className="login-input-checkbox"/>
                                <p>Lembrar-me</p>
                            </div>
                            <Link to="/forgotten-password" className="login-link-forgotten">
                                Esqueci minha senha
                            </Link>
                        </div>
                        <button className={readyRegister ? "login-button-enter-active" : "login-button-enter"}
                            onClick={handleLoginButton} disabled={!readyRegister}>Entrar</button>
                    </form>
                </main>
                <footer className="page-login-footer">
                    <div className="footer-register">
                        <p>Não tem conta?</p>
                        <Link to="/register" className="link-register">
                            Cadastre-se
                        </Link>
                    </div>
                    <div className="footer-observation">
                        <p>É de graça {" "}
                        <img src={purpleHeartIcon} alt="Coração Roxo"/>
                        </p>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Login;