import {Request,Response} from 'express';

import db from '../database/connection';
import { compareHash, makeHash } from '../utils/hashPassword';

require('dotenv').config();
const jwt = require('jsonwebtoken');

export default class UsersController {
    async create(req:Request, res:Response){
        const {
            name,
            email,
            password,
            is_proffy
        } = req.body;

        const avatar = "https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png";
        const bio = "";
        const whatsapp = "";

        const trx = await db.transaction();

        try {
            await makeHash(password).then(async (hash) => {
                await trx('users').insert({email,
                    password: hash,
                    name,
                    avatar,
                    bio,
                    whatsapp,
                    is_proffy});
                await trx.commit();
            });

            return res.sendStatus(201);
        } catch(e){
            await trx.rollback();
            return res.sendStatus(400).json({
                error: 'Unexpected error while creating new user'
            })
        }
    }

    async login(req: Request, res: Response){
        const {
            email,
            password
        } = req.body;
        const user = await db('users').where('email','=',email);
        const userPass = user[0].password;
        const userId = user[0].id;

        // await compareHash(password, passDB.password).then(result => {
        await compareHash(password, userPass).then(result => {
            // console.log(process.env.SECRET);
            const token = jwt.sign({userId}, process.env.SECRET);
            if (result){
                return res.send({token, userId});
            }
            return res.status(401).json({message: 'Invalid login!'});
        });
    }

    async simpleProfile(req:Request, res:Response){
        const {id} = req.params;
        const user = await db('users').where('id','=',id).first(['name','avatar']);
        return res.status(200).json(user);
    }

    async index(req:Request, res: Response) {
        const {id} = req.params;

        const user = await db('users')
                            .where('id','=',id)
                            .first('name','avatar','email','bio','whatsapp','is_proffy');
        return res.status(200).json(user);
    }

    async proffyProfile(req: Request, res:Response){
        const {id} = req.params;

        const proffy = await db('users')
                            .join('classes', 'users.id', '=', 'classes.user_id')
                            .where('users.id','=',id)
                            .select(['users.name','classes.*'])
                            .first();
        return res.status(200).json(proffy);
    }
}
