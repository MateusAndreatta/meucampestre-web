import React from 'react';

export default function CalendarItem(props) {
  let color = props.color || 'bg-blue-500';

  return (
    <div className="grid place-items-center">
      <div className={`h-2 w-2 rounded-full ${color}`} />
    </div>
  );
}
