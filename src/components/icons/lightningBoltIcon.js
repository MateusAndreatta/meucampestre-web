import { LightningBoltIcon as LightningBoltIconSolid } from '@heroicons/react/solid';
import { LightningBoltIcon as LightningBoltIconOutline } from '@heroicons/react/outline';

export default function LightningBoltIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'text-blue-400';
  let type = props.type || 'outline';

  let style = `${width} ${height} ${color}`;

  switch (type) {
    case 'outline':
      return <LightningBoltIconOutline className={style} />;
    default:
      return <LightningBoltIconSolid className={style} />;
  }
}
