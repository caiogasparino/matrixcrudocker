import AppError from '../../errors/AppError';
import { getMongoRepository, getRepository } from 'typeorm';

import Person from '../../entities/Person';
import Professions from '../../schemas/Professions';

interface IRequest {
  id: string;
}

interface IResponse {
  person: Person;
  profession: string[];
}

export async function getOnePerson({ id }: IRequest): Promise<IResponse> {
  const personRepository = getRepository(Person);
  const specialtyRepository = getMongoRepository(Professions, 'mongo');

  const person = await personRepository.findOne(id);

  if (!person) {
    throw new AppError('Person not found');
  }

  const personProfession = await specialtyRepository.findOne({
    where: { person_id: id },
  });

  if (!personProfession) {
    throw new AppError("person's profession not found");
  }

  return {
    person,
    profession: personProfession.profession,
  };
}
