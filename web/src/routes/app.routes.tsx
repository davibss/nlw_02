import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import TeacherForm from '../pages/TeacherForm';
import TeacherList from '../pages/TeachersList';
import UserProfile from '../pages/UserProfile';

function AppRoutes(){
    return (
        <BrowserRouter>
            <Route path="/" component={Landing} exact/>
            <Route path="/study" component={TeacherList}/>
            <Route path="/give-classes" component={TeacherForm}/>
            <Route path="/user-profile" component={UserProfile}/>
        </BrowserRouter>
    )
}

export default AppRoutes;