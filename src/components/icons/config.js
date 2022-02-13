import { CogIcon } from '@heroicons/react/outline';

export default function ConfigIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'text-blue-400';
  return <CogIcon className={`${width} ${height} ${color}`} />;
}
