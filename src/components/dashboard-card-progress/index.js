import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashboardCardProgress(props) {
  const Icon = props.icon;
  const bgColor = props.bgColor || 'bg-gray-200';
  const label = props.label;
  const percentage = props.percentage;
  const description = props.description;

  return (
    <div className="dashboard-card flex flex-col p-6">
      <div className="flex flex-row">
        <span className="flex-1 text-base font-normal text-neutral-500">
          {label}
        </span>
        <div
          className={`${bgColor} grid h-7 h-screen w-7 place-items-center rounded bg-blue-300`}>
          <Icon width="w-5" height="h-5" />
        </div>
      </div>
      <div className="flex flex-row">
        <div className="mr-2 grid h-14 w-14 grid-cols-1 place-items-center">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
              strokeLinecap: 'butt',
              // Text size
              textSize: '16px',
              // How long animation takes to go from one percentage to another, in seconds
              pathTransitionDuration: 0.5,
              pathColor: `#1AC56F`,
              textColor: '#777777',
              trailColor: '#D9D9D9',
            })}
          />
        </div>
        <div className="grid grid-cols-1 place-items-center">
          <span className="text-sm text-neutral-500	">{description}</span>
        </div>
      </div>
    </div>
  );
}
