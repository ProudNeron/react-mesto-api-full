import React, {useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({onClose, isOpen, onUpdateAvatar}) {
  const urlRef = React.useRef('');

  useEffect(() => {
    urlRef.current.value = '';
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(urlRef.current.value);

    onClose(false);
  }

  return (
    <PopupWithForm title='Обновить аватар' name={'change-avatar'} onSubmit={handleSubmit}
                   isOpen={isOpen} btnText={'Сохранить'} onClose={onClose}>
      <input type="url" ref={urlRef} required id="avatar-url" placeholder="Ссылка на изображение"
             className="popup__form-item text-input"/>
      <span className="popup__input-error avatar-url-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;