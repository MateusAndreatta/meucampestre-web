import { ExclamationCircleIcon as ExclamationCircleIconSolid } from '@heroicons/react/solid';
import { ExclamationCircleIcon as ExclamationCircleIconOutline } from '@heroicons/react/outline';

export default function ExclamationIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'text-blue-400';
  let type = props.type || 'outline';

  let style = `${width} ${height} ${color}`;

  switch (type) {
    case 'outline':
      return <ExclamationCircleIconOutline className={style} />;
    default:
      return <ExclamationCircleIconSolid className={style} />;
  }
}
