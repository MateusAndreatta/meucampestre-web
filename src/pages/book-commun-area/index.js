import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';
import CalendarBase from '../../components/calendar';
import CalendarItem from '../../components/calendar-item';
import CommonAreaItem from '../../components/common-area-item';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import Toaster from '../../utils/ui/toaster';
import Button from '../../components/buttons/button';

export default function BookCommonArea() {
  const navigate = useNavigate();
  const location = useLocation();

  const roles = SessionData.getRoles();
  const [adminEnable, setAdminEnable] = useState(roles.includes(ROLES.SINDICO));

  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  useEffect(() => {
    setData(location.state.data);
  }, []);

  function handleClick(item) {}

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="block text-2xl lg:hidden">{data.titulo}</h1>
          <h1 className="hidden text-2xl lg:block">Reservar área comum</h1>
          {adminEnable && (
            <Link to={`/editar-area-comum/${data.id}`}>
              <button className="btn-outline">Editar</button>
            </Link>
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
                photo={data.foto}
                description={data.descricao}
                loading={false}
                enable={data.disponivel}
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
              tileContent={({ activeStartDate, date, view }) =>
                view === 'month' && date.getDay() === 0 ? (
                  <CalendarItem color={'bg-red-400'} />
                ) : null
              }
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
