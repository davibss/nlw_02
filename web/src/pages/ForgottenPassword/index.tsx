import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import InputMaterial from '../../components/InputMaterial';
import returnIcon from '../../assets/images/icons/back.svg';
import SideBackground from '../../components/SideBackground';

import './styles.css';
import { Dialog } from '@material-ui/core';
import Sucess from '../Sucess';

import '../../utils/Validator';
import { validateEmail } from '../../utils/Validator';


function ForgottenPassword(){
    const [readyRegister, setReadyRegister] = useState(false);
    const [email, setEmail] = useState('');
    const [open,setOpen] = useState(false);

    function formPreventDefault(e: React.FormEvent){
        e.preventDefault();
    }

    function handleInputEmail(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        if (validateEmail(value)){
            setEmail(value);
            setReadyRegister(true);
        } else {
            setReadyRegister(false);
        }
        // if (value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
            // 
        // } else {
            // setReadyRegister(false);
        // }
    }

    function handleSendButton(){
        if (readyRegister){
            setOpen(true);
        }
    }

    return (
        <div className="page-register">
            <div className="page-register-main">
                <div className="top-bar-container">
                    <Link to="/">
                        <img src={returnIcon} alt="Voltar"/>
                    </Link>
                </div>
                <div className="page-register-body">
                    <div className="page-form-register">
                        <h1 className="form-title">Eita, esqueceu sua senha?</h1>
                        <p className="form-text">Não esquenta, vamos dar um jeito nisso.</p>
                        <form action="" className="form-register" onSubmit={formPreventDefault}>
                            <InputMaterial idInput="filled-basic" labelInput="E-mail" typeInput="text" onChange={handleInputEmail} value={email}/>
                            {/* <Link className={"button-send "+(readyRegister ? "login-button-enter-active" : "login-button-enter")} to="/sucess-forgotten-pass">Enviar</Link> */}
                            <input 
                                type="button"
                                className={"button-send "+(readyRegister ? "login-button-enter-active" : "login-button-enter")}
                                onClick={handleSendButton}
                                value="Enviar"
                            />
                            <Dialog fullScreen open={open}>
                                <Sucess 
                                    title="Redefinição enviada!" 
                                    subtitle="Boa, agora é só checar o e-mail que foi enviado
                                        para você redefinir sua senha e aproveitar os estudos."
                                    buttonTitle="Voltar ao login"
                                />
                            </Dialog>
                        </form>
                    </div>
                </div>
            </div>
            <SideBackground />
        </div>
    );
}

export default ForgottenPassword;