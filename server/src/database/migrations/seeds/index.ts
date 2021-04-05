import { createConnections } from 'typeorm';
import { personsSeeds } from './0001_Persons.seed';

async function runSeeds() {
  try {
    await createConnections();
    await personsSeeds();
    console.log('seeds executed with success ✨');
    return;
  } catch (err) {
    console.log(err);
    return;
  }
}

runSeeds();
