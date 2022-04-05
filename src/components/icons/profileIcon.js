import { UserIcon as UserIconSolid } from '@heroicons/react/solid';
import { UserIcon as UserIconOutline } from '@heroicons/react/outline';

export default function ProfileIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'text-gray-400';
  let type = props.type || 'outline';
  let classes = props.className;

  let style = `${width} ${height} ${color} ${classes}`;

  switch (type) {
    case 'outline':
      return <UserIconOutline className={style} />;
    default:
      return <UserIconSolid className={style} />;
  }
}
