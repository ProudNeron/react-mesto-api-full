import React from "react";
import {Link, Routes, Route} from "react-router-dom";
import NavBar from "./NavBar";

function Header({ logOut, user}) {
  return (
    <header className="header">
      <a aria-label={'Лого'} href="src/components/App#" className="header__logo"></a>
      <Routes>
        <Route path='/' element={<NavBar user={user} logOut={logOut}/>}/>
        <Route path='/signup' element={<Link to='/signin' className="header__link">Войти</Link>}/>
        <Route path='/signin' element={<Link to='/signup' className="header__link">Регистрация</Link>}/>
      </Routes>
    </header>
  );
}

export default Header;