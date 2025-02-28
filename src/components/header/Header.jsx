import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Menu from '../menu/Menu';
import User from '../user/User';
import './Header.scss';

const LOGO = "Yuvro";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user) || JSON.parse(localStorage.getItem('user'));

  // Mapping of user roles to their corresponding routes
  const routes = {
    student: '/student',
    faculty: '/faculty',
  };

  const onLogoClick = () => {
    const route = routes[user.userType];
    if (route) {
      navigate(route);
    } else {
      console.error("Unknown user type");
    }
  };

  return (
    <div className="sts-header">
      <div className="sts-logo" onClick={onLogoClick}>
        {LOGO}
      </div>
      <div className="sts-header__menu-container">
        <Menu/>
      </div>
      <div className="sts-user_container">
        <User/>
      </div>
    </div>
  );
};

export default Header;
