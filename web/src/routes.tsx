import React from 'react';
import {BrowserRouter,Route} from 'react-router-dom';
import Landing from './pages/Landing';
import TeacherList from './pages/TeachersList';
import TeacherForm from './pages/TeacherForm';
import Login from './pages/Login';
import Register from './pages/Register';
import Sucess from './pages/Sucess';
import ForgottenPassword from './pages/ForgottenPassword';

function Routes() {
    return (
        <BrowserRouter>
            <Route path="/" exact component={Login}/>
            {/* <Route path="/" exact component={Landing}/> */}
            <Route path="/home" component={Landing}/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
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
            {/*<Route path="/sucess-forgotten-pass" component={() => 
                <Sucess 
                    title="Redefinição enviada!" 
                    subtitle="Boa, agora é só checar o e-mail que foi enviado
                    para você redefinir sua senha e aproveitar os estudos."
                    buttonTitle="Voltar ao login"
                />}
            />*/}
        </BrowserRouter>
    );
}

export default Routes;