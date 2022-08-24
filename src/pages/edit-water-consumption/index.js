import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import moment from 'moment';
import 'moment/locale/pt-br';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import WaterConsumptionRepository from '../../repository/WaterConsumptionRepository';

import InputField from '../../components/fields/inputField';
import Button from '../../components/buttons/button';
import { maskHydrometer } from '../../mask';
import Toaster from '../../utils/ui/toaster';

export default function EditWaterConsumption(props) {
  const [txtConsumo, setTxtConsumo] = useState('');
  const [data, setData] = useState({});
  const [loadingButton, setLoadingButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  function handleConsumoChange(event) {
    const value = event.target.value;
    setTxtConsumo(maskHydrometer(value));
  }

  function handleClick() {
    if (txtConsumo.length > 0) {
      setLoadingButton(true);
      if (data.idLeitura == null) {
        WaterConsumptionRepository.create(
          {
            valor: txtConsumo,
            foto: '',
          },
          data.unidade.id
        )
          .then((response) => {
            Toaster.showSuccess('Leitura salva sucesso!');
            navigate('/consumo-hidrico');
          })
          .catch(() => {})
          .finally(() => {
            setLoadingButton(false);
          });
      } else {
        WaterConsumptionRepository.update(
          {
            leitura: txtConsumo,
          },
          data.idLeitura
        )
          .then((response) => {
            Toaster.showSuccess('Leitura salva sucesso!');
            navigate('/consumo-hidrico');
          })
          .catch(() => {})
          .finally(() => {
            setLoadingButton(false);
          });
      }
    } else {
      Toaster.showError('Preencha o campo consumo');
    }
  }

  useEffect(() => {
    console.log(location.state.data);
    setData(location.state.data);
    if (location.state.data.valorLido !== null) {
      setTxtConsumo(location.state.data.valorLido.toString());
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Editar consumo hídrico</h1>
          <Link to="/consumo-hidrico">
            <button className="btn-outline">Voltar</button>
          </Link>
        </div>
        <p className="mb-7">
          Ajuste a leitura da{' '}
          {data.unidade != undefined ? data.unidade.titulo : 'unidade'}{' '}
          referente ao mês de {moment().format('MMMM')}.
        </p>
        <form className="grid grid-cols-1 gap-4 md:grid-cols-1">
          <div className="mb-2">
            <InputField
              name="txtConsumo"
              value={txtConsumo}
              label="Consumo"
              type="text"
              required={true}
              onChange={handleConsumoChange}
            />
          </div>
        </form>
        <div className="mt-7 flex flex-row-reverse">
          <Button onClick={handleClick}>Salvar</Button>
        </div>
      </div>
    </div>
  );
}
