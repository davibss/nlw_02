import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';
import './styles.css';
import {api} from '../../services/api';
import convertMinutesToHours from '../../utils/convertMinutesToHours';


interface ScheduleItem {
    week_day: number,
    from: number,
    to: number,
}
export interface Teacher {
    id: number;
    name: string;
    avatar: string;
    bio: string;
    cost: number;
    subject: string;
    whatsapp: string;
    schedules: ScheduleItem[];
}


interface TeacherItemProps{
    teacher: Teacher;
}

const weekDays = ['Segunda','Terça','Quarta','Quinta','Sexta'];

const TeacherItem: React.FunctionComponent<TeacherItemProps> = ({teacher}) => {
    const weekDaysTeacher = teacher.schedules.map(schedule => schedule.week_day);

    const scheduleFromTo = weekDays.map((weekDay,index) => {
        return teacher.schedules.find(schedule => schedule.week_day === index+1);
    })

    function createNewConnection(){
        api.post('/connections', {
            user_id: teacher.id,
        })
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="Random"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>{teacher.bio}</p>
            <div className="schedule-container">
                {scheduleFromTo.map((schedule,index) => {
                    const exists = schedule;

                    return (
                        <div className={`schedule-item ${exists ? '':'disable'}`} key={index}>
                            <label htmlFor="">Dia</label>
                            <h3>{weekDays[index]}</h3>
                            <br/>
                            <label htmlFor="">Horário</label>
                            <h3>{exists ? `${scheduleFromTo[index]?.from! / 60}h - 
                                ${scheduleFromTo[index]?.to! / 60}h` : '-'}</h3>
                        </div>
                    );
                })}
            </div>
            <footer>
                <p>
                    Preço/hora
                    <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" onClick={createNewConnection} rel="noopener noreferrer" href={`https://wa.me/${teacher.whatsapp}`}>
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;