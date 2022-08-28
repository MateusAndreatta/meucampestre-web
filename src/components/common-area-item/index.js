export default function CommonAreaItem(props) {
  const photo = props.photo;
  const title = props.title;
  const description = props.description;
  const loading = props.loading || false;
  if (loading) return <SkeletonComponent />;

  return (
    <div className="dashboard-card flex flex-col p-4">
      <img src={photo} className={`rounded-lg`} alt="" />
      <span className="text-2xl font-medium ">{title}</span>
      <span className="text-neutral-500">{description}</span>
    </div>
  );
}

function SkeletonComponent() {
  return (
    <div className="mx-auto h-full w-full rounded-md border-2">
      <div className="flex h-64 max-h-full animate-pulse flex-col space-y-3 p-5">
        <div className="h-full w-full rounded-lg bg-gray-300" />
        <div className="h-6 w-full rounded-md bg-gray-300" />
        <div className="h-6 w-11/12 rounded-md bg-gray-300" />
      </div>
    </div>
  );
}
