import React, { useEffect, useState } from 'react';
import moment from 'moment';
import 'moment/locale/pt-br';
import CloseIcon from '../icons/closeIcon';
import NotificationsRepository from '../../repository/NotificationsRepository';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPanel(props) {
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    NotificationsRepository.findAll().then((response) => {
      setNotifications(response);
      props.setReadNotifications(response);
      response.forEach((notification) => {
        if (!notification.lido) {
          props.updateIcon();
          return false;
        }
      });
    });
  }, []);

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

  const handleClickNotification = (notification) => {
    if (notification.link) {
      console.log(notification.link.startsWith('/'));
      if (notification.link.startsWith('/')) {
        navigate(notification.link);
      } else {
        window.open(notification.link, '_blank');
      }
    }
  };

  return (
    <div className="w-full p-4 shadow-md">
      <div className="flex w-full justify-between">
        <h1 className="mb-3 text-2xl">Notificações</h1>
        <div onClick={() => props.onClose()}>
          <CloseIcon className="mt-1 cursor-pointer" width="w-7" height="h-7" />
        </div>
      </div>

      <div className="max-h-full divide-y divide-slate-200 overflow-y-auto md:max-h-96">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`my-2 flex ${notification.link ? 'cursor-pointer' : ''}`}
            onClick={() => {
              handleClickNotification(notification);
            }}>
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
