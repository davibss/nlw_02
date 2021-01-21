import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Sucess from '../pages/Sucess';
import ForgottenPassword from '../pages/ForgottenPassword';

function AuthRoutes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            <Route path="/register" component={Register}/>
            <Route path="/sucess-register" component={() => 
                <Sucess 
                    title="Cadastro concluído" 
                    subtitle="Agora você faz parte da plataforma da Proffy.
                    Tenha uma ótima experiência."
                    buttonTitle="Fazer login"
                />}
            />
            <Route path="/forgotten-password" component={ForgottenPassword}/>
        </BrowserRouter>
    )
}

export default AuthRoutes;