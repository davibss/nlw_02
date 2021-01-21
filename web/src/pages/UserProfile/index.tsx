import React, {useState, FormEvent} from 'react';
// import PageHeader from '../../components/PageHeader';
// import {useHistory} from 'react-router-dom';

import './styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
// import Select from '../../components/Select';
// import api from '../../services/api';

function UserProfile(){
    // const history = useHistory();
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    return (
        <div id="page-user-form" className="container">
            <div className="page-header">
                <img src="" alt=""/>
                <h3>Username</h3>
                <h5>Aluno</h5>
            </div>
            <main>
                <form onSubmit={() => {}}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input 
                            name="name" 
                            label="Nome Completo" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}/>
                        <Input 
                            name="avatar" 
                            label="Avatar"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}/>
                        <Input 
                            name="whatsapp" 
                            label="Whatsapp"
                            value={whatsapp}
                            onChange={(e) => setWhatsapp(e.target.value)}/>
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
        </div>
    );
}

export default UserProfile;