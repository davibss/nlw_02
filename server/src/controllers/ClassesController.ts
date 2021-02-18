import {Request,Response} from 'express';

import db from "../database/connection";
import convertHourToMinutes from "../utils/convertHourToMinutes";

import ScheduleController from './ScheduleController';
const scheduleController = new ScheduleController();

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
        const page = Number(filters.page as string || 1);

        const per_page = 2; // hereafter, change to 5
        const offset = (page - 1) * per_page;

        // if (!filters.subject || !filters.week_day || !filters.time) {
            // return res.status(400).json({
                // error: "Missing filters to search classes"
            // });
        // }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db('classes')
            .whereExists(function() {
                this.select('class_schedule.*')
                    .from('class_schedule')
                    .modify((queryBuilder) => {
                        if (week_day){
                            queryBuilder.whereRaw('class_schedule.week_day = ??', [Number(week_day)]);
                        }
                        if (time) {
                            queryBuilder.whereRaw('class_schedule.from <= ??', [timeInMinutes]);
                            queryBuilder.whereRaw('class_schedule.to > ??', [timeInMinutes]);
                        }
                    })
                    .whereRaw('class_schedule.class_id = classes.id')
                    // .whereRaw('class_schedule.week_day = ??', [Number(week_day)])
                    
            })
            .modify((queryBuilder) => {
                if (subject) {
                    queryBuilder.where('classes.subject', '=', subject)
                }
            })
            // .where('classes.subject', '=', subject)
            .join('users', 'classes.user_id', '=', 'users.id')
            .innerJoin('class_schedule','classes.id','=','class_schedule.class_id')
            // .select(['classes.*', 'users.*'])
            .select(['classes.*',
                     'users.name',
                     'users.bio',
                     'users.whatsapp',
                     'users.avatar',
                     db.raw('ARRAY_AGG(row_to_json(class_schedule)) as schedules'),
            ])
            .groupBy('classes.id','users.name','users.bio','users.whatsapp','users.avatar')
            .offset(offset)
            .limit(per_page);

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

    async countProffys(req: Request, res: Response){
        const numberProffys = await db('classes').count("id").first();
        return res.status(200).json(numberProffys);
    }

    async update(req: Request, res: Response){
        const {id} = req.params;
        let { updatedFields } = req.body;
        console.log(req.body);
        const schedules = req.body.schedules || [];
        const deleteSchedules = req.body.deleteSchedules || [];
        const createSchedules = req.body.createSchedules || [];
    
        const updatedClass = await db('classes')
                                .where('id','=',id)
                                .update(updatedFields,['*']) as any;

        const updatedSchedules = await scheduleController.updateManySchedules(schedules);
        const createdSchedules = await scheduleController
                                        .createManySchedules(createSchedules, Number(id), res);
        const deletedSchedules = await scheduleController.deleteManySchedules(deleteSchedules);
        return res.status(200).json({
            ...updatedClass[0], 
            schedules: updatedSchedules, 
            createdSchedules,
            deletedSchedules    
        });
    }
}