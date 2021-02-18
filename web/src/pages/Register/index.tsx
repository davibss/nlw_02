import React, { useState } from 'react';

import './styles.css';
import SideBackground from '../../components/SideBackground';
import { Link } from 'react-router-dom';
// import {TextField} from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';

// import logoImg from '../../assets/images/logo.svg';
import returnIcon from '../../assets/images/icons/back.svg';
// import classes from '*.module.css';
import InputMaterial from '../../components/InputMaterial';
import { Dialog } from '@material-ui/core';
import Sucess from '../Sucess';
import { validateEmail } from '../../utils/Validator';
import {api} from '../../services/api';
import RadioButtons from '../../components/RadioButtons';

function Register() {
    const [readyRegister, setReadyRegister] = useState(false);
    const [open,setOpen] = useState(false);
    const [name, setName] = useState('');
    const [undername, setUndername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isProffy, setIsProffy] = useState(false);

    function formPreventDefault(e: React.FormEvent){
        e.preventDefault();
    }

    function handleReadyRegister(){
        if (validateEmail(email) &&
            name !== '' &&
            undername !== '' &&
            password !== ''){
            setReadyRegister(true);
        }else{
            setReadyRegister(false);
        }
    }

    function handleSendButton(){
        const completeName = `${name} ${undername}`;
        api.post('/users', {name: completeName, email, password, is_proffy: isProffy})
            .then(() => {
                if (readyRegister){
                    setOpen(true);
                }
            })
            .catch(() => {
                alert('An error has ocurred!');
            });
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
                        <h1 className="form-title">Cadastro</h1>
                        <p className="form-text">Preencha os dados abaixo para começar.</p>
                        <form action="" className="form-register" onSubmit={formPreventDefault} onChange={handleReadyRegister}>
                            <InputMaterial 
                                idInput="filled-basic" 
                                labelInput="Nome" 
                                typeInput="text"
                                value={name}
                                onChange={e => setName(e.target.value)}/>
                            <InputMaterial 
                                idInput="filled-basic" 
                                labelInput="Sobrenome" 
                                typeInput="text"
                                value={undername}
                                onChange={e => setUndername(e.target.value)}/>
                            <InputMaterial 
                                idInput="filled-basic" 
                                labelInput="E-mail" 
                                typeInput="text" 
                                value={email}
                                onChange={e => setEmail(e.target.value)}/>
                            <InputMaterial 
                                idInput="filled-basic" 
                                labelInput="Senha" 
                                typeInput="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}/>
                            <RadioButtons proffy={isProffy} setProffy={setIsProffy}/>
                            <input 
                                type="button"
                                disabled={!readyRegister}
                                className={"button-send "+(readyRegister ? "login-button-enter-active" : "login-button-enter")}
                                onClick={handleSendButton}
                                value="Concluir cadastro"
                            />
                            <Dialog fullScreen open={open}>
                                <Sucess 
                                    title="Cadastro concluído" 
                                    subtitle="Agora você faz parte da plataforma da Proffy.
                                    Tenha uma ótima experiência."
                                    buttonTitle="Fazer login"
                                />
                            </Dialog>
                            {/* <Link className="button-register" to="/sucess-register">Concluir cadastro</Link> */}
                            {/* <button className="button-register">Concluir cadastro</button> */}
                        </form>
                    </div>
                </div>
            </div>
            <SideBackground />
        </div>
    );
}

export default Register;