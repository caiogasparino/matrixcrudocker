import AppError from '../../errors/AppError';
import { getMongoRepository, getRepository } from 'typeorm';

import Person from '../../entities/Person';
import Professions from '../../schemas/Professions';

interface IResponse {
  person: Person;
  profession: string[];
}

export async function getAllRegisteredPersons(): Promise<IResponse[]> {
  const personRepository = getRepository(Person);

  const persons = await personRepository.find();

  const specialtyRepository = getMongoRepository(Professions, 'mongo');

  const personsProfession = await specialtyRepository.find();

  const parsedPersons = persons.map((person) => {
    let personProfession = personsProfession.find(
      (personProfession) => personProfession.person_id === person.id
    );

    if (!personProfession) {
      throw new AppError("person's profession not found");
    }

    return {
      person,
      profession: personProfession.profession,
    };
  });

  return parsedPersons;
}
