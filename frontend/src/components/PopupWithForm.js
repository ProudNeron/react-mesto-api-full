function PopupWithForm({name, title,  isOpen, onClose, btnText, children, onSubmit}) {
  return (
    <div className={`popup popup_${name} ${isOpen && 'popup_opened'}`}>
      <div className="popup__container">
        <h2 className="popup__title">
          {title}
        </h2>
        <form onSubmit={onSubmit} action="submit" className="popup__form">
          {children}
          <button type="submit" aria-label={btnText} className="popup__submit-btn">{btnText}</button>
        </form>
        <button type="button" aria-label="Закрыть попап" onClick={onClose} className="popup__closed-btn"></button>
      </div>
    </div>
  );
}

export default PopupWithForm;