import { LogoutIcon as IconSolid } from '@heroicons/react/solid';
import { LogoutIcon as IconOutline } from '@heroicons/react/outline';

export default function LogoutIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'text-gray-400';
  let type = props.type || 'outline';
  let classes = props.className;

  let style = `${width} ${height} ${color} ${classes}`;

  switch (type) {
    case 'outline':
      return <IconOutline className={style} />;
    default:
      return <IconSolid className={style} />;
  }
}
