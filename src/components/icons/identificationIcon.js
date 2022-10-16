import { IdentificationIcon as IconSolid } from '@heroicons/react/20/solid';
import { IdentificationIcon as IconOutline } from '@heroicons/react/24/outline';

export default function IdentificationIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'default-icon-color';
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
