import { BellIcon as BellIconSolid } from '@heroicons/react/solid';
import { BellIcon as BellIconnOutline } from '@heroicons/react/outline';

export default function NotificationIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'text-gray-400';
  let type = props.type || 'outline';
  let classes = props.className;

  let style = `${width} ${height} ${color} ${classes}`;

  switch (type) {
    case 'outline':
      return <BellIconnOutline className={style} />;
    default:
      return <BellIconSolid className={style} />;
  }
}
