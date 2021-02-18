import React, {useState, FormEvent, useEffect, ChangeEvent} from 'react';
// import PageHeader from '../../components/PageHeader';
// import {useHistory} from 'react-router-dom';

import './styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Textarea from '../../components/TextArea';
import SimpleHeader from '../../components/SimpleHeader';
import { useAuth } from '../../contexts/auth';
import {api, cloudApi} from '../../services/api';

// import cameraIcon from '../../assets/images/icons/camera.svg';
import Select from '../../components/Select';
import convertMinutesToHours from '../../utils/convertMinutesToHours';
import { useHistory } from 'react-router-dom';
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

interface Schedule {
    id: number,
    week_day: string,
    from: number,
    to: number,
    class_id: number
}
interface ProffyClass {
    classID: number,
    subject: string,
    cost: number,
    schedules: Schedule[]
}

function getDescription(isProffy: boolean, subject: string){
    if (isProffy){
        return `Professor${subject === undefined ? `` : ` de ${subject}`}`;
    }else {
        return 'Aluno';
    }
}

function UserProfile(){
    const history = useHistory();
    const [name, setName] = useState('');
    const [undername, setUndername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [email,setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');
    const [isProffy, setIsProffy] = useState(false);
    const [originalAvatar, setOriginalAvatar] = useState('');
    // const [subject, setSubject] = useState('');
    const [proffyClass,setProffyClass] = useState<ProffyClass>(null || {} as ProffyClass);
    const [selectedImage, setSelectedImage] = useState<File>(null || {} as File);

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
                setOriginalAvatar(avatar);
                return is_proffy;
            })
            .then(proffy => {
                if (proffy){
                    api.get(`/proffy-profile/${userId}`)
                        .then(response => {
                            if (response.data !== []){
                                const {classID,subject,cost,schedules} = response.data;
                                setProffyClass({subject,
                                                classID,
                                                cost: Number(cost) ,
                                                schedules: schedules});
                            }
                        });
                }
            });
    },[userId,isProffy]);

    function handleUserAvatar(event: ChangeEvent<HTMLInputElement>){
        if (!event.target.files){
            return;
          }
        const fileImage = event.target.files[0];
        setSelectedImage(fileImage);
        setAvatar(URL.createObjectURL(fileImage));
    }

    function sendDataToApi(user: UserData){
        api.patch(`/users/${userId}`, user)
            .then(_ => {
                alert('Atualização realizada com sucesso!')
                history.push('/');
            })
            .catch(() => {
                alert('Erro no cadastro');
            });
    }

    async function handleSubmit(event: FormEvent){
        event.preventDefault();
        const userData: UserData = {
            name: name+' '+undername,
            email,
            avatar,
            whatsapp,
            bio,
            is_proffy: isProffy
        }
        if (avatar !== originalAvatar){
            let formData = new FormData();
            formData.append("file", selectedImage);
            formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET || '');
            const imageUrl = await cloudApi.post('/upload', formData)
                                            .then(response => {
                                                return response.data.secure_url;
                                            });
            sendDataToApi({...userData, avatar: imageUrl });
        } else {
            sendDataToApi(userData);
        }
    }

    return (
        <div id="page-user-form" className="container">
            <SimpleHeader title="Meu perfil"/>
            <div className="page-header">
                <div className="image-container">
                    <img src={avatar} alt="user_avatar" className="user-avatar"/>
                    <div className="upload-file-container">
                        <label>
                            <input
                                type="file"
                                style={{display:'none'}}
                                accept="image/png, image/jpeg"
                                onChange={handleUserAvatar}
                            />
                        </label>
                    </div>
                </div>
                <h3>{`${name} ${undername}`}</h3>
                <h5>{getDescription(isProffy,proffyClass.subject)}</h5>
            </div>
            <main>
                <form onSubmit={handleSubmit}>
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
                    {isProffy && proffyClass.subject &&
                        (
                            <>
                                <fieldset>
                                    <legend>Sobre a aula</legend>
                                    <Select disabled
                                        name="subject" 
                                        label="Matéria"
                                        value={proffyClass.subject || ''}
                                        options={[
                                            {value: 'Artes', label: 'Artes'},
                                            {value: 'Biologia', label: 'Biologia'},
                                            {value: 'Ciências', label: 'Ciências'},
                                            {value: 'Educação Física', label: 'Educação Física'},
                                            {value: 'Matemática', label: 'Matemática'},
                                            {value: 'Português', label: 'Português'},
                                            {value: 'Física', label: 'Física'},
                                            {value: 'Química', label: 'Química'},
                                            {value: 'Geografia', label: 'Geografia'},
                                            {value: 'História', label: 'História'},
                                        ]}/>
                                    <Input disabled
                                        name="cost" 
                                        label="Custo da sua aula por hora"
                                        value={`R$ ${proffyClass.cost.toFixed(2).replace('.',',')}`}/>
                                </fieldset>
                                <fieldset>
                                    <legend>
                                        Horários Disponíveis
                                    </legend>
                                    {proffyClass.schedules.map((scheduleItem, index) => {
                                        return (
                                            <div className="schedule-item" key={scheduleItem.week_day}>
                                                <Select disabled
                                                    name="week_day"
                                                    label="Dia da Semana"
                                                    value={scheduleItem.week_day}
                                                    // onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                                    options={[
                                                        {value: '0', label: 'Domingo'},
                                                        {value: '1', label: 'Segunda-feira'},
                                                        {value: '2', label: 'Terça-feira'},
                                                        {value: '3', label: 'Quarta-feira'},
                                                        {value: '4', label: 'Quinta-feira'},
                                                        {value: '5', label: 'Sexta-feira'},
                                                        {value: '6', label: 'Sábado'},
                                                    ]}
                                                />
                                                <Input disabled
                                                    name="from" 
                                                    label="Das" 
                                                    type="time"
                                                    value={convertMinutesToHours(scheduleItem.from)}
                                                    // onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                                />
                                                <Input disabled
                                                    name="to" 
                                                    label="Até" 
                                                    type="time"
                                                    value={convertMinutesToHours(scheduleItem.to)}
                                                    // onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                                />
                                            </div>);
                                        }
                                    )}
                                </fieldset>
                            </>
                        )
                    }
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