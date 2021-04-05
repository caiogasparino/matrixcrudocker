import AppError from '../../errors/AppError';
import { getMongoRepository, getRepository } from 'typeorm';
import { parseProfession } from '../../utils/parseProfession';

import Person from '../../entities/Person';
import Professions from '../../schemas/Professions';

interface IRequest {
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

const professionAvailable = [
  'ADVOGADO',
  'FISIOTERAPEUTA',
  'DESENVOLVEDOR',
  'ANALISTA TI',
  'VIGILANTE',
  'TECNICO TI',
];

export async function register({
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

  parsedProfession.map((profession) => {
    if (!professionAvailable.includes(profession.toUpperCase())) {
      throw new AppError(`Person's specialty: '${profession}' not is available`);
    }
  });

  const person = personRepository.create({
    name,
    phone_number,
    cellphone_number,
    cep,
    street,
    state,
    city,
  });

  const specialtyRepository = getMongoRepository(Professions, 'mongo');

  const personProfession = specialtyRepository.create({
    profession: parsedProfession,
    person_id: person.id,
  });

  await personRepository.save(person);
  await specialtyRepository.save(personProfession);

  return {
    person: person,
    profession: personProfession.profession,
  };
}
