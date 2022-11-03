import React from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';

export default function NotificationsPanel() {
  const notifications = [
    {
      id: 1,
      titulo: 'Fulano suas ovelhas estão doidas!',
      descricao: 'FAVOR CONTER SUAS OVELHAS',
      criadoEm: new Date(),
      link: null,
      lido: false,
    },
    {
      id: 2,
      titulo: 'Ronaldo Cardozo (P) acaba de ser liberado(a) na portaria',
      descricao: 'Ronaldo Cardozo (P) acabou de chegar!',
      criadoEm: new Date(2022, 9, 30, 23, 50, 0),
      link: null,
      lido: true,
    },
    {
      id: 3,
      titulo: 'Sua solicitação de reserva foi aprovada! 🎉',
      descricao:
        'Clique aqui para ver mais informações sobre suas solicitações',
      criadoEm: new Date(2022, 2, 12, 5, 0, 0),
      link: '/solicitacoes-areas-comuns',
      lido: false,
    },
    {
      id: 4,
      titulo: 'Sua solicitação de reserva foi aprovada! 🎉',
      descricao:
        'Clique aqui para ver mais informações sobre suas solicitações',
      criadoEm: new Date(2022, 2, 12, 5, 0, 0),
      link: '/solicitacoes-areas-comuns',
      lido: false,
    },
    {
      id: 5,
      titulo: 'Sua solicitação de reserva foi aprovada! 🎉',
      descricao:
        'Clique aqui para ver mais informações sobre suas solicitações',
      criadoEm: new Date(2022, 2, 12, 5, 0, 0),
      link: '/solicitacoes-areas-comuns',
      lido: false,
    },
    {
      id: 6,
      titulo: 'Sua solicitação de reserva foi aprovada! 🎉',
      descricao:
        'Clique aqui para ver mais informações sobre suas solicitações',
      criadoEm: new Date(2022, 2, 12, 5, 0, 0),
      link: '/solicitacoes-areas-comuns',
      lido: false,
    },
    {
      id: 7,
      titulo: 'Sua solicitação de reserva foi aprovada! 🎉',
      descricao:
        'Clique aqui para ver mais informações sobre suas solicitações',
      criadoEm: new Date(2022, 2, 12, 5, 0, 0),
      link: '/solicitacoes-areas-comuns',
      lido: false,
    },
  ];

  const formatarData = (dataParametro) => {
    var data = moment(dataParametro);
    var hoje = moment();

    const semanas = hoje.diff(data, 'weeks');
    if (semanas > 0) {
      return 'há ' + semanas + ' semanas';
    }
    const dias = hoje.diff(data, 'days');
    if (dias > 0) {
      return 'há ' + dias + ' dias';
    }
    const horas = hoje.diff(data, 'hours');
    if (horas > 0) {
      return 'há ' + horas + ' horas';
    }
    const minutos = hoje.diff(data, 'minutes');
    if (horas > 0) {
      return 'há ' + minutos + ' horas';
    }
    return 'Agora mesmo';
  };

  return (
    <div className="w-full p-4 shadow-md">
      <h1 className="mb-3 text-2xl">Notificações</h1>
      <div className="divide-y divide-slate-200">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`my-2 flex ${
              notification.link ? 'cursor-pointer' : ''
            }`}>
            <div
              className={`mt-2 h-3 w-3 rounded-full bg-gray-300 ${
                notification.lido ? 'invisible' : ''
              }`}></div>
            <div className="ml-2">
              <h3 className="text-lg">{notification.titulo}</h3>
              <p className="text-gray-400">{notification.descricao}</p>
              <span className="text-sm text-gray-400">
                {formatarData(notification.criadoEm)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
