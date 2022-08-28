import React from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';

function CalendarBase(props) {
  const PrevComponent = () => {
    return (
      <div className="rounded-full bg-blue-500 p-2 text-white">
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
          />
        </svg>
      </div>
    );
  };

  const NextComponent = () => {
    return (
      <div className="rounded-full bg-blue-500 p-2 text-white">
        <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M10 19a1 1 0 0 1-.64-.23a1 1 0 0 1-.13-1.41L13.71 12L9.39 6.63a1 1 0 0 1 .15-1.41a1 1 0 0 1 1.46.15l4.83 6a1 1 0 0 1 0 1.27l-5 6A1 1 0 0 1 10 19z"
          />
        </svg>
      </div>
    );
  };

  return (
    <div>
      <Calendar
        prevLabel={<PrevComponent />}
        nextLabel={<NextComponent />}
        locale={'pt-br'}
        minDetail={'month'}
        showNavigation={true}
        prev2Label={false}
        next2Label={false}
        showNeighboringMonth={false}
        navigationLabel={({ date, label, locale, view }) => {
          let mes = moment(date).format('MMM');
          return `${mes.charAt(0).toUpperCase() + mes.slice(1)}, ${moment(
            date
          ).format('YYYY')}`;
        }}
        {...props}
      />
    </div>
  );
}

export default CalendarBase;
