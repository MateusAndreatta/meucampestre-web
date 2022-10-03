import Button from '../buttons/button';

export default function StatusTag(props) {
  const status = props.status;

  let style = 'bg-gray-200 text-white-500';

  if (status === 'PENDENTE') {
    style = 'bg-yellow-50 text-amber-500';
  }

  if (status === 'APROVADA') {
    style = 'bg-emerald-50 text-green-600';
  }

  if (status === 'RECUSADA') {
    style = 'bg-rose-50 text-red-500';
  }

  return (
    <div className={`rounded-xl px-4 py-1 ${style}`}>{props.children}</div>
  );
}
