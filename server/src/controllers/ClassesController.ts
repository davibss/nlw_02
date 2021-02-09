import {Request,Response} from 'express';

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {
    week_day: number,
    from: string,
    to: string,
}

interface ScheduleItemUpdate extends ScheduleItem{
    id: number;
}

export default class ClasssesController {

    async index(req:Request, res:Response){
        const filters = req.query;

        const subject = filters.subject as string;
        const week_day = filters.week_day as string;
        const time = filters.time as string;

        if (!filters.subject || !filters.week_day || !filters.time) {
            return res.status(400).json({
                error: "Missing filters to search classes"
            });
        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .whereRaw('class_schedule.class_id = classes.id')
                    .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
                    .whereRaw('class_schedule.from <= ??', [timeInMinutes])
                    .whereRaw('class_schedule.to > ??', [timeInMinutes])
            })
            .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            // .select(['classes.*', 'users.*'])
            .select(['classes.*', 'users.name','users.bio','users.whatsapp','users.avatar'])

        res.json(classes)
    }

    async create(req:Request,res:Response) {
        const {
            user_id,
            subject,
            cost,
            schedule
        } = req.body;
    
        const trx = await db.transaction();
    
        try {        
            const insertedClassesIDS = await trx('classes').insert({
                subject, cost, user_id
            }).returning('id');
            const class_id = insertedClassesIDS[0];
        
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
        
            await trx('class_schedule').insert(classSchedule);
        
            await trx.commit();
            
            return res.status(201).send();
        } catch(e){
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new class'
            });
        }
    }

    async update(req: Request, res: Response){
        const {id} = req.params;
        const updatedFields = req.body;
        let schedules = [];
        if ('schedules' in updatedFields){
            schedules = updatedFields.schedules;
            delete updatedFields.schedules;
        }

        const updatedClass = await db('classes')
                                .where('id','=',id)
                                .update(updatedFields,['*']) as any;


        // console.log('schedules', schedules);
        const updatedSchedules = await Promise.all(schedules.map(async (scheduleItem: ScheduleItemUpdate) => {
            const classFields = {
                week_day: scheduleItem.week_day,
                from: convertHourToMinutes(scheduleItem.from),
                to: convertHourToMinutes(scheduleItem.to),
            };
            const scheduleUpdated = await db('class_schedule')
                                    .where('id','=',scheduleItem.id)
                                    .update(classFields,'*') as any;
            return scheduleUpdated[0];
        }));
        return res.status(200).json({...updatedClass[0], schedules: updatedSchedules});

    }
}