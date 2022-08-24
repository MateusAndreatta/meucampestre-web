import lupa from '../../resources/lupa.png';

export default function LupaIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';

  return <img src={lupa} className={`${width} ${height}`} />;
}
