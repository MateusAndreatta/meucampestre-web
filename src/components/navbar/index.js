import Logo from '../../resources/MeuCampestreLogo.svg';
import NotificationIcon from '../icons/notificationIcon';
import ProfileIcon from '../icons/profileIcon';
import LogoutIcon from '../icons/logoutIcon';
import { useNavigate } from 'react-router-dom';
import SessionData from '../../utils/sessionData';
import NotificationsPanel from '../notifications-panel';
import I18n from '../i18n/I18n';
import Translator from '../i18n/Translator';

export default function Navbar() {
  const user = SessionData.getUser();
  const condo = SessionData.getCondo();
  const navigate = useNavigate();
  function navigateToHome() {
    navigate('/home');
  }

  function logout() {
    SessionData.logout();
  }

  function navigateToProfile() {
    navigate('/perfil');
  }

  return (
    <nav className="flex h-16 w-full flex-row flex-nowrap items-center justify-between bg-white shadow-md">
      <img
        src={condo.imagemUrl || Logo}
        alt="Logo"
        className="max-h-full w-14 max-w-fit grow cursor-pointer object-cover md:mr-1"
        onClick={navigateToHome}
      />

      <div className="h-16 flex-none">
        <div className="flex h-full w-full flex-row flex-nowrap items-center gap-8 px-8">
          <div className="group">
            <I18n />
            <NotificationIcon
              height="h-8"
              width="w-8"
              className="cursor-pointer"
            />
            <div className="w-70 absolute right-0 z-10 rounded-md bg-white shadow-lg group-hover:block">
              <NotificationsPanel />
            </div>
          </div>

          <div className="group">
            <img
              alt="Perfil"
              src={
                user.imagemUrl ||
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
                <div
                  className="text-md block block cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={navigateToProfile}>
                  <span className="flex flex-col">
                    <span>
                      <ProfileIcon className="float-left mr-3" />
                      <Translator path="navbar.profile" />
                    </span>
                  </span>
                </div>
                <div
                  className="text-md block block cursor-pointer px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                  role="menuitem"
                  onClick={logout}>
                  <span className="flex flex-col">
                    <span>
                      <LogoutIcon className="float-left mr-3" />
                      <Translator path="navbar.logout" />
                    </span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
