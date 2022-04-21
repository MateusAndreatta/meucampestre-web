export default function Card(props) {
  const Icon = props.icon;
  return (
    <div className="card flex flex-col">
      <div className="flex w-full grow items-center justify-center p-4">
        <Icon width="w-1/2" height="h-1/2" />
      </div>
      <div className="bottom-0 border-t text-center">
        <span>{props.title}</span>
      </div>
    </div>
  );
}
