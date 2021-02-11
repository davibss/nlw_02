import {Response} from 'express';
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
    async createManySchedules(schedules: ScheduleItem[], class_id: number, res: Response){
        const trx = await db.transaction();
        try {
            const classSchedule = schedules.map((scheduleItem: ScheduleItem) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes(scheduleItem.from),
                    to: convertHourToMinutes(scheduleItem.to),
                };
            });
            const createdSchedules = schedules.length === 0 ? 
                [] : await trx('class_schedule').insert(classSchedule,"*");
            await trx.commit();    
            return createdSchedules;
        } catch (error) {
            await trx.rollback();
            return res.status(400).json({
                error: 'Unexpected error while creating new schedules'
            });
        }
    }

    async updateManySchedules(schedules: ScheduleItemUpdate[]){
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
        return updatedSchedules;
    }

    async deleteManySchedules(schedulesId: Number[]){
        const schedulesDeleted = await db('class_schedule')
                                        .whereIn('id', schedulesId)
                                        .del('*');
        return schedulesDeleted;
    }
}