import React, {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import axios from 'axios';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import Header from '../../components/Header';

import { Container, Form, Input, InputMask, Button } from './styles';
import api from '../../services/api';
import { useHistory, useRouteMatch } from 'react-router-dom';

interface ViaCepResponse {
  bairro: string;
  cep: string;
  complemento: string;
  ddd: string;
  gia: string;
  ibge: string;
  localidade: string;
  logradouro: string;
  siafi: string;
  uf: string;
}

interface PersonParams {
  id: string;
}

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

const Edit: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [cellphoneNumber, setCellphoneNumber] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const history = useHistory();
  const { params } = useRouteMatch<PersonParams>();

  useEffect(() => {
    api.get<IPersonState>(`persons/${params.id}`).then((response) => {
      const {
        name,
        cep,
        cellphone_number,
        city,
        phone_number,
        state,
        street,
      } = response.data.person;
      setName(name);
      setZipcode(cep);
      setCellphoneNumber(cellphone_number);
      setCity(city);
      setPhoneNumber(phone_number);
      setState(state);
      setStreet(street);
      setSelectedItems(response.data.profession);
    });
  }, [
    setName,
    setPhoneNumber,
    setCellphoneNumber,
    setZipcode,
    setStreet,
    setCity,
    setState,
    setSelectedItems,
    params.id,
  ]);

  const handleAssignCEP = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        const parsedZipcode = event.target.value.replace('-', '').trim();

        if (parsedZipcode.length <= 7) {
          return;
        }

        const response = await axios.get<ViaCepResponse>(
          `https://viacep.com.br/ws/${parsedZipcode}/json/`
        );

        if (response.data.cep) {
          setZipcode(response.data.cep);
          setCity(response.data.localidade);
          setState(response.data.uf);
          setStreet(response.data.logradouro);
        } else {
          toast.error('CEP não encontrado.');
        }
      } catch (err) {
        const e = new ErrorEvent('error', {
          message: 'my error',
        });
        window.dispatchEvent(e);
      }
    },
    []
  );

  const handleSelectProfessions = useCallback(
    (specialty) => {
      const alreadySelected = selectedItems.findIndex(
        (item) => item === specialty
      );

      if (alreadySelected >= 0) {
        const filteredItems = selectedItems.filter(
          (item) => item !== specialty
        );

        setSelectedItems(filteredItems);
      } else {
        setSelectedItems([...selectedItems, specialty]);
      }
    },
    [selectedItems]
  );

  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event?.preventDefault();

      const data = {
        name,
        phone_number: phoneNumber,
        cellphone_number: cellphoneNumber,
        cep: zipcode.replace('-', '').trim(),
        street,
        state,
        city,
        profession: selectedItems,
      };

      const schema = Yup.object().shape({
        name: Yup.string().required('Nome é obrigatório'),
        phone_number: Yup.string(),
        cellphone_number: Yup.string().required(
          'Número de celular é obrigatório'
        ),
        cep: Yup.string().required('CEP é obrigatório'),
        street: Yup.string().required('Rua é obrigatório'),
        state: Yup.string().required('Estado é obrigatório'),
        city: Yup.string().required('Cidade é obrigatório'),
        profession: Yup.array()
          .min(1)
          .max(6)
          .required('Ao menos uma profissão é obrigatória'),
      });

      const valid = await schema.isValid(data);

      if (!valid) {
        toast.error('Existem campo(s) inválidos, verificar novamente...');
        return;
      }

      await api.put(`persons/${params.id}`, {
        ...data,
        profession: selectedItems.join(', '),
      });

      toast.success('Dados atualizados com sucesso!');

      history.push('/');
    },
    [
      name,
      phoneNumber,
      cellphoneNumber,
      zipcode,
      street,
      state,
      city,
      selectedItems,
      history,
      params.id,
    ]
  );

  return (
    <>
      <Header />
      <Container>
        <Form onSubmit={handleSubmit}>
          <h2>Atualizar dados: {name}</h2>
          <Input
            placeholder='Nome'
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
          <InputMask
            placeholder='Telefone Fixo'
            format='(##) ####-####'
            value={phoneNumber}
            onChange={(e: any) => setPhoneNumber(e.target.value)}
          />
          <InputMask
            placeholder='Telefone Celular'
            format='(##) #####-####'
            value={cellphoneNumber}
            onChange={(e: any) => setCellphoneNumber(e.target.value)}
          />
          <InputMask
            placeholder='CEP'
            format='#####-###'
            onChange={handleAssignCEP}
            value={zipcode}
          />
          <Input
            placeholder='UF'
            value={state}
            onChange={(e: any) => setState(e.target.value)}
          />
          <Input
            placeholder='Cidade'
            value={city}
            onChange={(e: any) => setCity(e.target.value)}
          />
          <Input
            placeholder='Rua'
            value={street}
            onChange={(e: any) => setStreet(e.target.value)}
          />
          <fieldset>
            <legend>
              <h2>Profissão</h2>
              <span>Selecione uma profissão abaixo</span>
            </legend>

            <ul className='items-grid'>
              {professionAvailable.map((item) => (
                <li
                  key={item}
                  onClick={() => handleSelectProfessions(item)}
                  className={selectedItems.includes(item) ? 'selected' : ''}
                >
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </fieldset>

          <Button type='submit'>Atualizar</Button>
        </Form>
      </Container>
    </>
  );
};

export default Edit;

const professionAvailable = [
  'ADVOGADO',
  'FISIOTERAPEUTA',
  'DESENVOLVEDOR',
  'ANALISTA TI',
  'VIGILANTE',
  'TECNICO TI',
];
