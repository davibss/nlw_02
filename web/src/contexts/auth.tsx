import React, { useContext, useEffect, useState } from 'react';
import {createContext} from 'react';
import {api} from '../services/api';
import login from '../services/auth';

interface AuthContextData {
    signed: boolean;
    token: string;
    userId: number;
    signIn(email: string,password: string, checked: boolean): Promise<void>;
    signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({children}) => {
    const [userId,setUserId] = useState<number>(0);
    const [token,setToken] = useState<string>('');

    function loadStorageData() {
        const storageUserId = window.localStorage.getItem('@RNAuth:userId');
        const storageToken = window.localStorage.getItem('@RNAuth:token');
        if (storageUserId && storageToken) {
            api.defaults.headers.Authorization = `Bearer ${storageToken}`;
            setUserId(JSON.parse(storageUserId));
            setToken(storageToken);
        }
    }

    useEffect(() => {
        loadStorageData();
    },[])

    async function signIn(email: string, password: string, checked: boolean){
        // const response = await login(email,password);
        login(email,password).then(response => {
            const {token,userId} = response;
            setUserId(userId);
            setToken(token);

            api.defaults.headers.Authorization = `Bearer ${token}`;

            if (checked){
                window.localStorage.setItem('@RNAuth:userId', JSON.stringify(userId));
                window.localStorage.setItem('@RNAuth:token', token);
            }
        }).catch(error => {
            alert(error.response.data.message);
        });
    }

    function signOut(){
        window.localStorage.clear();
        setUserId(0);
        setToken('');
    }

    return (
        <AuthContext.Provider value={{signed: !!userId, token, userId, signIn, signOut}}>
            {children}
        </AuthContext.Provider>
    )
};

// export default AuthContext;
export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}