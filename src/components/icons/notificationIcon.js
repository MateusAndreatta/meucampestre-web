import { BellIcon as IconSolid } from '@heroicons/react/20/solid';
import { BellIcon as IconOutline } from '@heroicons/react/24/outline';
import { BellAlertIcon as IconAlertSolid } from '@heroicons/react/24/solid';
import { BellAlertIcon as IconAlertOutline } from '@heroicons/react/24/outline';

export default function NotificationIcon(props) {
  let width = props.width || 'w-5';
  let height = props.height || 'h-5';
  let color = props.color || 'default-icon-color';
  let type = props.type || 'outline';
  let alertMode = props.alertMode || false;
  let classes = props.className;

  let style = `${width} ${height} ${color} ${classes}`;

  switch (type) {
    case 'outline':
      return alertMode ? (
        <IconAlertOutline className={style} />
      ) : (
        <IconOutline className={style} />
      );
    default:
      return alertMode ? (
        <IconAlertSolid className={style} />
      ) : (
        <IconSolid className={style} />
      );
  }
}
