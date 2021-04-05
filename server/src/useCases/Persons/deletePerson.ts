import AppError from 'errors/AppError';
import { getMongoRepository, getRepository } from 'typeorm';

import Person from '../../entities/Person';
import Professions from '../../schemas/Professions';

interface IRequest {
  id: string;
}

export async function deletePerson({ id }: IRequest): Promise<void> {
  const personRepository = getRepository(Person);
  const specialtyRepository = getMongoRepository(Professions, 'mongo');

  try {
    await personRepository.delete(id);

    await specialtyRepository.findOneAndDelete({ person_id: id });
  } catch (err) {
    throw new AppError(err);
  }
}
