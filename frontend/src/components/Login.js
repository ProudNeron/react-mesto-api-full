import AuthForm from "./AuthForm";
import {useState} from "react";

function Login({handleAuthorization}) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSignin(e) {
    e.preventDefault();

    handleAuthorization({email, password});

    setEmail('');
    setPassword('');
  }

  return (
    <main className='content content_type_auth'>
      <AuthForm title='Вход' btnText='Войти' onSubmit={handleSignin}>
        <input type="email" value={email} onChange={handleEmailChange} required placeholder="Email"
               className="auth__form-item text-input text-input_place_auth"/>
        <input value={password} type="password" onChange={handlePasswordChange}
               minLength={2} maxLength={40} required placeholder="Пароль"
               className="auth__form-item text-input text-input_place_auth"/>
      </AuthForm>
    </main>
  );
}

export default Login;