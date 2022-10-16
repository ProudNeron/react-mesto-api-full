import {Link} from "react-router-dom";

function NavBar({logOut, email}) {

  function handleLogOut() {
    logOut();
  }
  return (
    <nav className='nav-bar'>
      <h2 className='nav-bar__title'>{email}</h2>
      <Link to='/signin' onClick={handleLogOut} className='header__link'>Выйти</Link>
    </nav>
  );
}

export default NavBar;
