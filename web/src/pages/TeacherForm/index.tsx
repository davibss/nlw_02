import React, {useState, FormEvent, useEffect} from 'react';
import PageHeader, { SubdescriptionType } from '../../components/PageHeader';
import {useHistory} from 'react-router-dom';

import './styles.css';
import Input from '../../components/Input';

import warningIcon from '../../assets/images/icons/warning.svg';
import Select from '../../components/Select';
import {api} from '../../services/api';
import { useAuth } from '../../contexts/auth';
import convertMinutesToHours from '../../utils/convertMinutesToHours';

const subjectOptions = [
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
];

interface ScheduleItemCreate {
    week_day: number;
    from: string;
    to: string
}
interface ScheduleItem {
    id: number;
    week_day: number;
    from: string;
    to: string
}

function TeacherForm(){
    const history = useHistory();
    const {userId} = useAuth();
    const [classId, setClassId] = useState<Number>();
    const [subject, setSubject] = useState('');
    const [cost, setCost] = useState('');
    const [haveClasses,setHaveClasses] = useState(false);
    const [scheduleItems, setScheduleItems] = useState([
        {week_day:0, from: '', to: ''}
    ]);
    const [deleteSchedules, setDeleteSchedules] = useState<Number[]>([]);
    // const [createSchedules, setCreateSchedules] = useState<Number[]>([]);

    useEffect(() => {
        api.get(`/proffy-profile/${userId}`)
            .then(response => {
                if (response.data){
                    let {classID,subject,cost,schedules} = response.data;
                    schedules = schedules.map((schedule: ScheduleItem) => {
                        schedule.from = convertMinutesToHours(Number(schedule.from));
                        schedule.to = convertMinutesToHours(Number(schedule.to));
                        return {...schedule};
                    })
                    setClassId(classID);
                    setSubject(subject);
                    setCost(cost);
                    setScheduleItems(schedules);
                    setHaveClasses(true);
                }
            });
    },[]);

    function setScheduleItemValue(position: number, field: string, value: string){
        const newArray = scheduleItems.map((scheduleItem,index) => {
            if (index === position){
                return {...scheduleItem, [field]: field === 'week_day' ? Number(value) : value};
            }
            return scheduleItem;
        });
        setScheduleItems(newArray);
    }

    function addNewScheduleItem() {
        setScheduleItems([...scheduleItems, 
        {
            week_day:0,
            from: '',
            to: ''
        }]);
    }

    function deleteNewScheduleItem(scheduleItem: any, indexSchedule: number) {
        if (scheduleItem.id){
            setDeleteSchedules([...deleteSchedules,scheduleItem.id])
        }
        setScheduleItems(scheduleItems.filter((sche,index) => index !== indexSchedule));
    }

    function handleCreateClass(e:FormEvent){
        e.preventDefault();

        if(haveClasses){
            api.patch(`/classes/${classId}`, 
                {
                    updatedFields:{
                        subject,cost: Number(cost)
                    },
                    schedules: scheduleItems.filter((schedule: any) => schedule.id),
                    deleteSchedules,
                    createSchedules: scheduleItems.filter((schedule: any) => !schedule.id)})
                .then(() => {
                    alert('Alterações salvas com sucesso!')
                    history.push('/');
                })
                .catch(() => {
                    alert('Erro ao alterar os dados da aula.')
                })
        } else {
            api.post('/classes', {
                user_id: userId,
                subject,
                cost: Number(cost),
                schedule: scheduleItems
            }).then(() => {
                alert('Cadastro realizado com sucesso!')
                history.push('/');
            }).catch(() => {alert('Erro no cadastro')})
        }
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas"
                description="O primeiro passo é preencher esse formulário de inscrição"
                subdescriptionType={SubdescriptionType.TeacherForm}/>
            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select 
                            name="subject" 
                            label="Matéria"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            options={subjectOptions}/>
                        <Input 
                            name="cost" 
                            label="Custo da sua aula por hora"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}/>
                    </fieldset>
                    <fieldset>
                        <legend>
                            Horários Disponíveis
                            <button type="button" onClick={addNewScheduleItem}>+ Novo horário</button>
                        </legend>
                        {scheduleItems.map((scheduleItem, index) => {
                            return (<div key={scheduleItem.week_day}>
                                        <div className="schedule-item">
                                            <Select
                                                name="week_day"
                                                label="Dia da Semana"
                                                value={scheduleItem.week_day}
                                                onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
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
                                            <Input 
                                                name="from" 
                                                label="Das" 
                                                type="time"
                                                value={scheduleItem.from}
                                                onChange={e => setScheduleItemValue(index, 'from', e.target.value)}/>
                                            <Input 
                                                name="to" 
                                                label="Até" 
                                                type="time"
                                                value={scheduleItem.to}
                                                onChange={e => setScheduleItemValue(index, 'to', e.target.value)}/>
                                        </div>
                                        <div className="delete-schedule-container">
                                            <div className="border"></div>
                                            <span className="delete-schedule" onClick={() => deleteNewScheduleItem(scheduleItem,index)}>Excluir horário</span>
                                            <div className="border"></div>
                                        </div>
                                    </div>
                            );
                            }
                        )}

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
            <br />
        </div>
    );
}

export default TeacherForm;