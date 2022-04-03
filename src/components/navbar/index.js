import Logo from '../../resources/MeuCampestreLogo.svg';
import NotificationIcon from '../icons/notificationIcon';

export default function Navbar() {
  return (
    <nav className="flex h-16 w-full flex-row flex-nowrap items-center justify-between bg-white shadow-md">
      <img
        src={Logo}
        alt="Logo"
        className="max-h-full w-14 max-w-fit grow object-cover"
      />
      <div className="h-16 flex-none">
        <div className="flex h-full w-full flex-row flex-nowrap items-center gap-8 px-8">
          <NotificationIcon
            height="h-8"
            width="w-8"
            className="cursor-pointer"
          />
          <img
            alt="Perfil"
            src="https://i.pravatar.cc/300"
            className="h-8 w-8 cursor-pointer rounded-full bg-gray-500 object-cover"
          />
        </div>
      </div>
    </nav>
  );
}
