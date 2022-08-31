import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import 'moment/locale/pt-br';
import CommonAreaItem from '../../components/common-area-item';
import SessionData from '../../utils/sessionData';
import { ROLES } from '../../utils/Constants';
import Toaster from '../../utils/ui/toaster';
import CommunAreaRepository from '../../repository/CommunAreaRepository';

export default function CommonAreas() {
  const navigate = useNavigate();

  const roles = SessionData.getRoles();
  const [adminEnable, setAdminEnable] = useState(roles.includes(ROLES.SINDICO));

  const [value, onChange] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    CommunAreaRepository.findAll()
      .then((response) => {
        console.log(response.areasComuns);
        setData(response.areasComuns);
        setLoading(false);
      })
      .catch((error) => {});
  }, [value]);

  function handleClick(item) {
    if (!item.ativo) {
      if (!adminEnable) {
        Toaster.showInfo(
          'Esse espaço está indiponivel, por favor contacte o síndico para mais informações'
        );
      } else {
        navigate(`/editar-area-comum`, { state: { data: item } });
      }
      return;
    }
    navigate(`/reservar-area-comum`, { state: { data: item } });
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Áreas comuns</h1>
          <Link to="/solicitacoes-areas-comuns">
            <button className="btn-outline">Solicitações</button>
          </Link>
        </div>
        <p className="mb-7">
          Confira as áreas comuns disponiveis para os moradores do condomínio.
        </p>
        <div className="mb-4 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data.map((item) => {
            return (
              <CommonAreaItem
                key={item.id}
                title={item.titulo}
                photo={item.urlFoto}
                description={item.descricao}
                loading={loading}
                enable={item.ativo}
                admin={adminEnable}
                onClick={() => {
                  handleClick(item);
                }}
              />
            );
          })}
          {adminEnable && (
            <Link
              to="/nova-area-comum"
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
      </div>
    </div>
  );
}
