import Button from '../buttons/button';

export default function StatusTag(props) {
  const photo = props.photo;
  const title = props.title;
  const description = props.description;
  const enable = props.enable;
  const admin = props.admin;
  const loading = props.loading || false;

  return (
    <div className="rounded-xl bg-red-300 bg-opacity-50 px-4 py-1 text-red-500">
      {props.children}
    </div>
  );
}
