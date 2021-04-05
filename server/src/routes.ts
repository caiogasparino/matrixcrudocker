import { Router } from 'express';
import { PersonsController } from './controllers/PersonsController';

const routes = Router();

const personsController = new PersonsController();

routes.post('/persons', personsController.create);
routes.get('/persons', personsController.index);
routes.get('/persons/:id', personsController.find);
routes.put('/persons/:id', personsController.update);
routes.delete('/persons/:id', personsController.delete);

export default routes;
