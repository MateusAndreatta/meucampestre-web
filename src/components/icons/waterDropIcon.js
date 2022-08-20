import waterDrop from '../../resources/water-drop.png';

export default function WaterDropIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';

  return <img src={waterDrop} className={`${width} ${height}`} />;
}
