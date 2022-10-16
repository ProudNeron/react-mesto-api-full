import PopupWithForm from "./PopupWithForm";

function SubmitPopup({onCardDelete, onClose, isOpen}) {
  function handleSubmit(e) {
    e.preventDefault();

    onCardDelete();

    onClose('');
  }

  return (
    <PopupWithForm title={'Вы уверены?'} name={'submit-popup'} btnText={'Да'} onClose={onClose}
                   isOpen={isOpen} onSubmit={handleSubmit} />
  );
}

export default SubmitPopup;