import React, {useState, FormEvent, useEffect} from 'react';
// import PageHeader from '../../components/PageHeader';
// import {useHistory} from 'react-router-dom';

import './styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
import SimpleHeader from '../../components/SimpleHeader';
import { useAuth } from '../../contexts/auth';
import api from '../../services/api';
// import Select from '../../components/Select';
// import api from '../../services/api';

interface UserData {
    name: string;
    avatar: string;
    email: string;
    bio: string;
    whatsapp: string;
    is_proffy: boolean;
}

function getDescription(isProffy: boolean, subject: string){
    if (isProffy){
        return `Professor${!subject || ` de ${subject}`}`;
    }else {
        return 'Aluno';
    }
}

function UserProfile(){
    // const history = useHistory();
    const [name, setName] = useState('');
    const [undername, setUndername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [isProffy, setIsProffy] = useState(false);
    const [subject, setSubject] = useState('');

    const {userId} = useAuth();

    useEffect(() => {
        api.get(`/users/${userId}`)
            .then(response => {
                const {avatar, name, email, whatsapp, bio, is_proffy} = 
                    response.data as UserData;
                const [firstName, secondName] = name.split(' ');
                setName(firstName);
                setUndername(secondName);
                setAvatar(avatar);
                setEmail(email);
                setBio(bio);
                setWhatsapp(whatsapp);
                setIsProffy(is_proffy);
            });
        if (isProffy){
            api.get(`/proffy-profile/${userId}`)
                .then(response => {
                    if (response.data !== []){
                        const {subject} = response.data;
                        setSubject(subject);
                    }
                });
        }
    },[userId,isProffy]);

    return (
        <div id="page-user-form" className="container">
            <SimpleHeader title="Meu perfil"/>
            <div className="page-header">
                <img src={avatar} alt=""/>
                <h3>{`${name} ${undername}`}</h3>
                <h5>{getDescription(isProffy,subject)}</h5>
            </div>
            <main>
                <form onSubmit={() => {}}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <div className="group-name">
                            <Input 
                                name="name" 
                                label="Nome" 
                                value={name} 
                                onChange={(e) => setName(e.target.value)}/>
                            <Input 
                                name="undername" 
                                label="Sobrenome" 
                                value={undername} 
                                onChange={(e) => setUndername(e.target.value)}/>
                        </div>
                        <div className="group-contact">
                            <Input 
                                name="email" 
                                label="E-mail" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}/>
                            <Input 
                                name="whatsapp" 
                                label="Whatsapp"
                                value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}/>
                        </div>
                        <Textarea 
                            name="bio" 
                            label="Biografia"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}/>
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br />
                            Preencha todos os dados
                        </p>
                        <button type="submit">Salvar cadastro</button>
                    </footer>
                </form>
            </main>
            <br/>{/* Not resolved yet */}
        </div>  
    );
}

export default UserProfile;