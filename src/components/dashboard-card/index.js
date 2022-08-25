export default function DashboardCard(props) {
  const Icon = props.icon;
  const bgColor = props.bgColor || 'bg-gray-200';
  const label = props.label;
  const value = props.value;
  const loading = props.loading || false;

  if (loading) return <SkeletonComponent />;

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

function SkeletonComponent() {
  return (
    <div className="mx-auto h-24 w-full rounded-md border-2">
      <div className="flex h-full animate-pulse flex-row justify-between space-x-5 p-5">
        <div className="flex flex-col space-y-3">
          <div className="h-6 w-36 rounded-md bg-gray-300"></div>
          <div className="h-6 w-24 rounded-md bg-gray-300"></div>
        </div>
        <div className="h-7 w-7 rounded bg-gray-300"></div>
      </div>
    </div>
  );
}
