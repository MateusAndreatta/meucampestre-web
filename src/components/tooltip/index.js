export default function Tooltip(props) {
  return (
    <div className="group relative flex flex-col items-center overflow-visible	">
      {props.children}
      <div className="absolute bottom-0 mb-6 flex hidden flex-col items-center overflow-visible group-hover:flex	">
        <span className="whitespace-no-wrap relative z-10 rounded-md bg-gray-600 p-2 text-xs text-white shadow-lg">
          {props.message}
        </span>
        <div className="-mt-2 h-3 w-3 rotate-45 bg-gray-600"></div>
      </div>
    </div>
  );
}
