import { PhotographIcon as IconSolid } from '@heroicons/react/solid';
import { PhotographIcon as IconOutline } from '@heroicons/react/outline';

export default function PhotoIcon(props) {
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