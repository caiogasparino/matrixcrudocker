import AppError from '../../errors/AppError';
import { getMongoRepository, getRepository } from 'typeorm';
import { parseProfession } from '../../utils/parseProfession';

import Person from '../../entities/Person';
import Professions from '../../schemas/Professions';

interface IRequest {
  id: string;
  name: string;
  phone_number: string;
  cellphone_number: string;
  cep: string;
  street: string;
  state: string;
  city: string;
  profession: string;
}

interface IResponse {
  person: Person;
  profession: string[];
}

export async function updatePerson({
  id,
  name,
  phone_number,
  cellphone_number,
  cep,
  street,
  state,
  city,
  profession,
}: IRequest): Promise<IResponse> {
  const personRepository = getRepository(Person);
  const specialtyRepository = getMongoRepository(Professions, 'mongo');

  const person = await personRepository.findOne(id);

  if (!person) {
    throw new AppError('Person not found');
  }

  person.name = name;
  person.phone_number = phone_number;
  person.cellphone_number = cellphone_number;
  person.cep = cep;
  person.street = street;
  person.state = state;
  person.city = city;

  await personRepository.save(person);

  const parsedProfession = parseProfession(profession);

  if (parsedProfession.length < 1) {
    throw new AppError(`The person must have at least 2 profession`);
  }

  const registeredProfession = [''];
  parsedProfession.map((profession) => {
    if (registeredProfession.includes(profession.toUpperCase())) {
      throw new AppError(`profession cannot be repeated`);
    } else {
      registeredProfession.push(profession);
    }
  });

  const personsProfession = await specialtyRepository.findOne({
    where: { person_id: person.id },
  });

  if (!personsProfession) {
    throw new AppError("person's profession not found");
  }

  personsProfession.profession = parsedProfession;

  await specialtyRepository.save(personsProfession);

  return {
    person,
    profession: parsedProfession,
  };
}
