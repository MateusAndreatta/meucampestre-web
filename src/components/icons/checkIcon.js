import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/react/solid';
import { CheckCircleIcon as CheckCircleIconOutline } from '@heroicons/react/outline';

export default function CheckIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'text-blue-400';
  let type = props.type || 'outline';
  let classes = props.className;

  let style = `${width} ${height} ${color} ${classes}`;

  switch (type) {
    case 'outline':
      return <CheckCircleIconOutline className={style} />;
    default:
      return <CheckCircleIconSolid className={style} />;
  }
}
