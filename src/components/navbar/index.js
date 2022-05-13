import Logo from '../../resources/MeuCampestreLogo.svg';
import NotificationIcon from '../icons/notificationIcon';
import ProfileIcon from '../icons/profileIcon';
import LogoutIcon from '../icons/logoutIcon';
import { useNavigate } from 'react-router-dom';
import SessionData from '../../utils/sessionData';

export default function Navbar() {
  const user = SessionData.getUser();
  const navigate = useNavigate();
  function NavigateToHome() {
    navigate('/home');
  }

  function logout() {
    SessionData.logout();
  }

  return (
    <nav className="flex h-16 w-full flex-row flex-nowrap items-center justify-between bg-white shadow-md">
      <img
        src={Logo}
        alt="Logo"
        className="max-h-full w-14 max-w-fit grow cursor-pointer object-cover"
        onClick={NavigateToHome}
      />
      <div className="h-16 flex-none">
        <div className="flex h-full w-full flex-row flex-nowrap items-center gap-8 px-8">
          <NotificationIcon
            height="h-8"
            width="w-8"
            className="cursor-pointer"
          />
          <div className="group">
            <img
              alt="Perfil"
              src={
                user.fotoDePerfil ||
                `https://ui-avatars.com/api/?name=${user.nome}`
              }
              className="h-8 w-8 cursor-pointer rounded-full bg-gray-500 object-cover"
            />
            <div className="absolute right-0 z-10 hidden origin-top-right rounded-md bg-white shadow-lg group-hover:block">
              <div
                className="py-1 "
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu">
                <a
                  href="#"
                  className="text-md block block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem">
                  <span className="flex flex-col">
                    <span>
                      <ProfileIcon className="float-left mr-3" />
                      Meu perfil
                    </span>
                  </span>
                </a>
                <a
                  href="#"
                  className="text-md block block px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem">
                  <span className="flex flex-col">
                    <span onClick={logout}>
                      <LogoutIcon className="float-left mr-3" />
                      Sair
                    </span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
