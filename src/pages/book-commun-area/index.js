import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';
import CalendarBase from '../../components/calendar';
import CalendarItem from '../../components/calendar-item';
import CommonAreaItem from '../../components/common-area-item';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import Button from '../../components/buttons/button';
import BookCommunAreaRepository from '../../repository/BookCommunAreaRepository';
import Toaster from '../../utils/ui/toaster';

export default function BookCommonArea() {
  const navigate = useNavigate();
  const location = useLocation();

  const roles = SessionData.getRoles();
  const [adminEnable, setAdminEnable] = useState(roles.includes(ROLES.SINDICO));

  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [unvaibleDates, setUnvaibleDates] = useState([]);

  useEffect(() => {
    setData(location.state.data);
    BookCommunAreaRepository.getUnavailableDates(location.state.data.id).then(
      (response) => {
        setUnvaibleDates(response.data.datasReservadas);
      }
    );
  }, []);

  function handleClick(item) {
    BookCommunAreaRepository.create({
      idAreaComum: data.id,
      dataSolicitacao: value,
    }).then((response) => {
      Toaster.showSuccess('Solicitação de reserva realizada com sucesso!');
      navigate('/solicitacoes-areas-comuns');
    });
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="block text-2xl lg:hidden">{data.titulo}</h1>
          <h1 className="hidden text-2xl lg:block">Reservar área comum</h1>
          {adminEnable && (
            <button
              className="btn-outline"
              onClick={() => {
                navigate(`/editar-area-comum`, { state: { data: data } });
              }}>
              Editar
            </button>
          )}
        </div>
        <p className="mb-7">
          Selecione a data que deseja utilizar e clique em “solicitar”.
        </p>

        <div className="grid w-auto grid-cols-1 items-center justify-between gap-6 lg:grid-cols-2">
          <div className="mx-auto">
            <div className="hidden w-96 lg:block">
              <CommonAreaItem
                key={data.id}
                title={data.titulo}
                photo={data.urlFoto}
                description={data.descricao}
                loading={false}
                enable={data.ativo}
                admin={adminEnable}
              />
            </div>
          </div>
          <div className="mx-auto max-w-full">
            <CalendarBase
              onChange={onChange}
              value={value}
              maxDate={moment().add(30, 'd').toDate()}
              minDate={new Date()}
              tileContent={({ activeStartDate, date, view }) => {
                if (view === 'month') {
                  let datesFiltered = unvaibleDates.filter(
                    (e) =>
                      moment(e.data).format('YYYY-MM-DD') ===
                      moment(date).format('YYYY-MM-DD')
                  );

                  if (datesFiltered.length > 0) {
                    return (
                      <div className="flex flex-row flex-nowrap justify-center">
                        {datesFiltered.map((e) => {
                          if (e.status === 'PENDENTE') {
                            return (
                              <CalendarItem
                                key={e.data}
                                color={'bg-orange-400'}
                              />
                            );
                          }
                          return (
                            <CalendarItem key={e.data} color={'bg-red-600'} />
                          );
                        })}
                      </div>
                    );
                  }
                }
              }}
            />
          </div>
        </div>
        <div className="my-3 flex flex-row-reverse">
          <Button onClick={handleClick}>Solicitar</Button>
        </div>
      </div>
    </div>
  );
}
