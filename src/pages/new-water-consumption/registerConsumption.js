import React, { useEffect, useState } from 'react';
import InputField from '../../components/fields/inputField';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import Button from '../../components/buttons/button';
import moment from 'moment';
import 'moment/locale/pt-br';
import { maskHydrometer } from '../../mask';
import SelectField from '../../components/fields/selectField';

export default function RegisterConsumption(props) {
  const data = props.data;
  console.log(props.state);

  const [txtConsumo, setTxtConsumo] = useState('');

  function handleUnidadeChange(value) {
    props.state.unidade = value;
  }

  function handleConsumoChange(event) {
    const value = event.target.value;
    setTxtConsumo(maskHydrometer(value));
    props.state.consumo = maskHydrometer(value);
  }

  return (
    <div>
      <p className="mb-7">
        Informe os dados abaixo para adicionar a leitura do hidrômetro referente
        ao mês de {moment().format('MMMM')}.
      </p>
      <form className="grid grid-cols-1 gap-4 md:grid-cols-1">
        <div className="mb-2">
          <SelectField
            label="Chácara"
            required={true}
            data={data}
            optionName="titulo"
            optionKey="id"
            onChange={handleUnidadeChange}
          />
        </div>

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
        <Button onClick={props.onClick}>Próximo</Button>
      </div>
    </div>
  );
}
