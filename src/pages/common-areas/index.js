import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/pt-br';
import CalendarBase from '../../components/calendar';
import CalendarItem from '../../components/calendar-item';
import CommonAreaItem from '../../components/common-area-item';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';

export default function CommonAreas() {
  const navigate = useNavigate();

  const roles = SessionData.getRoles();
  const [adminEnable, setAdminEnable] = useState(roles.includes(ROLES.SINDICO));

  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([
    {
      id: 1,
      titulo: 'Piscina dos peixes',
      descricao: 'Área com uma cabena e piscina com lindos peixes e 4 cadeiras',
      foto: 'http://lorempixel.com.br/500/400/?1',
      disponivel: true,
    },
    {
      id: 2,
      titulo: 'Area bonita',
      descricao: 'Descrição da área bonita',
      foto: 'http://lorempixel.com.br/500/400/?2',
      disponivel: true,
    },
    {
      id: 2,
      titulo: 'Area em manutenção',
      descricao: 'Manutenção em andamento',
      foto: 'http://lorempixel.com.br/500/400/?3',
      disponivel: false,
    },
  ]);

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Áreas comuns</h1>
          <Link to="/novo-acesso">
            <button className="btn-outline">Solicitações</button>
          </Link>
        </div>
        <p className="mb-7">
          Confira as áreas comuns disponiveis para os moradores do condomínio.
        </p>
        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map((item) => {
            if (!item.disponivel) {
              return;
            }
            return (
              <CommonAreaItem
                key={item.id}
                title={item.titulo}
                photo={item.foto}
                description={item.descricao}
                loading={loading}
              />
            );
          })}
          {adminEnable && (
            <Link
              to="/areas-comuns-cadastro"
              className="group flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 py-3 text-sm  leading-6 text-slate-900 hover:border-solid hover:border-blue-500 hover:bg-white hover:text-blue-500">
              <svg
                className="mb-1 text-slate-400 group-hover:text-blue-500"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true">
                <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
              </svg>
              Nova área
            </Link>
          )}
        </div>

        <div className="flex hidden items-center justify-center">
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
    </div>
  );
}
