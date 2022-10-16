import AuthForm from "./AuthForm";
import {Link} from "react-router-dom";
import {useState} from "react";

function Register({handleRegister}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function signup(e) {
    e.preventDefault();

    handleRegister({email, password});

    setEmail('');
    setPassword('');
  }

  return (
    <main className="content content_type_auth">
      <AuthForm title='Регистрация' btnText='Зарегистрироваться' onSubmit={signup}>
        <input type="email" value={email} required placeholder="Email" onChange={handleEmailChange}
               className="auth__form-item text-input text-input_place_auth"/>
        <input type="password" value={password}
               minLength={2} maxLength={40} required placeholder="Пароль"
               onChange={handlePasswordChange} className="auth__form-item text-input text-input_place_auth"/>
      </AuthForm>
      <Link to='/signin' className="auth__link">Уже зарегистрированы? Войти</Link>
    </main>
  );
}

export default Register;