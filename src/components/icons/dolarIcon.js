import dolar from '../../resources/dolar.png';

export default function DolarIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';

  return <img src={dolar} className={`${width} ${height}`} />;
}
