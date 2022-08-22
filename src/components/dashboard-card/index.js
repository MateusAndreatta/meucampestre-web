export default function DashboardCard(props) {
  const Icon = props.icon;
  const bgColor = props.bgColor || 'bg-gray-200';
  const label = props.label;
  const value = props.value;
  return (
    <div className="dashboard-card flex flex-col p-6">
      <div className="flex flex-row">
        <span className="flex-1 text-base font-normal text-neutral-500">
          {label}
        </span>
        <div
          className={`${bgColor} grid h-7 w-7 place-items-center rounded bg-blue-300`}>
          <Icon width="w-5" height="h-5" />
        </div>
      </div>
      <div>
        <span className="text-2xl font-medium text-neutral-500">{value}</span>
      </div>
    </div>
  );
}
