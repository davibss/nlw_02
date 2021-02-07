import express from 'express';
import ClasssesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';
import UsersController from './controllers/UsersController';

const classController = new ClasssesController();
const connectionsController = new ConnectionsController();
const usersController = new UsersController();

const routes = express.Router();

routes.post('/classes', classController.create);
routes.get('/classes', classController.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

routes.post('/users', usersController.create);
routes.post('/login', usersController.login);

routes.patch('/users/:id', usersController.update);

routes.get('/user-simple-profile/:id', usersController.simpleProfile);
routes.get('/users/:id', usersController.index);
routes.get('/proffy-profile/:id', usersController.proffyProfile);

// routes.get("/", (req,res) =>  {
    // return res.json({message: 'Hello World'})
// })

export default routes;