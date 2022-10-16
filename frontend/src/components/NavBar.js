import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

function NavBar({logOut, user}) {
  const [email, setEmail] = useState();
  useEffect(() => {
    setEmail(user);
  },[user]);

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
