import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import '../../CustomCalendar.css';
import moment from 'moment';
import 'moment/locale/pt-br';
import { formatDate } from 'react-calendar/src/shared/dateFormatter';
import CalendarBase from '../../components/calendar';
import CalendarItem from '../../components/calendar-item';

export default function CommonAreas() {
  const navigate = useNavigate();
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="my-8 flex justify-between">
          <h1 className="text-2xl">Areas comuns</h1>
          <Link to="/novo-acesso">
            <button className="btn-outline">Novo acesso</button>
          </Link>
        </div>
        <div className="flex items-center justify-center">
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
