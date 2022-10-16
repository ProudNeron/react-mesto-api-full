function AuthForm({title, btnText, onSubmit, children}) {
  return (
    <div className="auth">
      <h2 className='auth__title'>{title}</h2>
      <form onSubmit={onSubmit} action='submit' className='auth__form'>
        {children}
        <button type='submit' aria-label={btnText} className='popup__submit-btn popup__submit-btn_place_auth'>
          {btnText}
        </button>
      </form>
    </div>
  );
}

export default AuthForm;