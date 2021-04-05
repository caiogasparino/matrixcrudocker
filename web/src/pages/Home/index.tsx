import React, { useCallback, useEffect, useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import Header from '../../components/Header';

import { Container, TableContainer } from './styles';
import { toast } from 'react-toastify';

interface IPerson {
  id: string;
  name: string;
  phone_number: string;
  cellphone_number: string;
  cep: string;
  street: string;
  state: string;
  city: string;
}

interface IPersonState {
  person: IPerson;
  profession: string[];
}

const Home: React.FC = () => {
  const [persons, setPersons] = useState<IPersonState[]>([]);

  const history = useHistory();

  const loadPersons = useCallback(async () => {
    const response = await api.get('/persons');

    setPersons(response.data);
  }, []);

  useEffect(() => {
    loadPersons();
  }, [loadPersons]);

  const handleRemovePerson = useCallback(
    async (id: string) => {
      try {
        await api.delete(`persons/${id}`);
        toast.success('Cadastro excluído com sucesso');
        loadPersons();
      } catch (err) {
        toast.success(
          'Ocorreu um erro ao deletar cadastro, tente novamente mais tarde.'
        );
      }
    },
    [loadPersons]
  );

  const handleEditPerson = useCallback(
    (id: string) => {
      history.push({ pathname: `/edit/${id}`, state: { id } });
    },
    [history]
  );

  return (
    <Container>
      <Header />
      <TableContainer>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Estado</th>
              <th>Cidade</th>
              <th>Profissão:</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {persons?.map((user) => (
              <tr key={user.person.id}>
                <td>{user.person.name}</td>
                <td>{user.person.state}</td>
                <td>{user.person.city}</td>
                <td>
                  {user.profession.map((specialty) => (
                    <li key={specialty}>{specialty}</li>
                  ))}
                </td>
                <td className='user-actions'>
                  <button
                    type='button'
                    onClick={() => handleEditPerson(user.person.id)}
                  >
                    <FiEdit size={20} color='#9183dc' />
                  </button>
                  <button
                    type='button'
                    onClick={() => handleRemovePerson(user.person.id)}
                  >
                    <FiTrash2 size={20} color='#ff4b5b' />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </TableContainer>
    </Container>
  );
};

export default Home;
