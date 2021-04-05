import { Request, Response } from 'express';
import { register } from '../useCases/Persons/register';
import { getAllRegisteredPersons } from '../useCases/Persons/getAllRegisteredPersons';
import { updatePerson } from '../useCases/Persons/updatePerson';
import { getOnePerson } from '../useCases/Persons/getOnePerson';
import { deletePerson } from '../useCases/Persons/deletePerson';

export class PersonsController {
  async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      phone_number,
      cellphone_number,
      cep,
      street,
      state,
      city,
      profession,
    } = request.body;

    const person = await register({
      name,
      phone_number,
      cellphone_number,
      cep,
      street,
      state,
      city,
      profession,
    });

    return response.json(person);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const persons = await getAllRegisteredPersons();

    return response.json(persons);
  }

  async find(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const person = await getOnePerson({ id });

    return response.json(person);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      phone_number,
      cellphone_number,
      cep,
      street,
      state,
      city,
      profession,
    } = request.body;
    const { id } = request.params;

    const person = await updatePerson({
      id,
      name,
      phone_number,
      cellphone_number,
      cep,
      street,
      state,
      city,
      profession,
    });

    return response.json(person);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await deletePerson({ id });

    return response.json().status(201);
  }
}
