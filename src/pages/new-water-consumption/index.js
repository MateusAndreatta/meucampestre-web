import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import InputField from '../../components/fields/inputField';
import { useNavigate, useParams } from 'react-router-dom';
import Toaster from '../../utils/ui/toaster';
import Button from '../../components/buttons/button';
import moment from 'moment';
import 'moment/locale/pt-br';
import { maskHydrometer } from '../../mask';
import SelectField from '../../components/fields/selectField';

export default function NewWaterConsumption() {
  let { id } = useParams();
  const [loadingButton, setLoadingButton] = useState(false);

  const [txtUnidade, setTxtUnidade] = useState('');
  const [txtConsumo, setTxtConsumo] = useState('');

  useEffect(() => {
    // UnityRepository.findById(id).then((response) => {
    //   console.log(response);
    //   setTxtTitle(response.titulo);
    //   setTxtAddress(response.endereco);
    //   setTxtDescription(response.descricao);
    //   // setTxtCoordinates(response.coordenadas);
    // });
  }, []);

  function handleUnidadeChange(event) {
    const value = event.target.value;
    setTxtUnidade(value);
  }

  function handleConsumoChange(event) {
    const value = event.target.value;
    setTxtConsumo(maskHydrometer(value));
  }

  const navigate = useNavigate();

  function handleSubmit() {
    // if (txtTitle.length < 1) {
    //   Toaster.showInfo('É necessário informar o titulo');
    //   return;
    // }
    // setLoadingButton(true);
    // UnityRepository.update(
    //   {
    //     titulo: txtTitle,
    //     endereco: txtAddress,
    //     descricao: txtDescription,
    //     coordenadas: txtCoordinates,
    //   },
    //   id
    // )
    //   .then((response) => {
    //     console.log(response);
    //     Toaster.showSuccess('Unidade editada!');
    //     navigate('/unidades');
    //   })
    //   .catch((error) => {
    //     if (error.response.data.message) {
    //       Toaster.showError(error.response.data.message);
    //     } else {
    //       Toaster.showError('Ops, ocorreu um erro, tente novamente mais tarde');
    //     }
    //   })
    //   .finally(() => {
    //     setLoadingButton(false);
    //   });
  }

  const mockData = [
    { id: 1, unidade: 'Chácara 2', disponivel: true },
    { id: 2, unidade: 'Chácara 3', disponivel: false },
    { id: 3, unidade: 'Chácara 4', disponivel: true },
  ];

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <h1 className="my-8 text-2xl">Nova leitura</h1>
        <div>
          <p className="mb-7">
            Informe os dados abaixo para adicionar a leitura do hidrômetro
            referente ao mês de {moment().format('MMMM')}.
          </p>
          <form className="grid grid-cols-1 gap-4 md:grid-cols-1">
            <div className="mb-2">
              <SelectField
                label="Chácara"
                required={true}
                data={mockData}
                optionName="unidade"
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
            <Button loading={loadingButton} onClick={handleSubmit}>
              Próximo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
