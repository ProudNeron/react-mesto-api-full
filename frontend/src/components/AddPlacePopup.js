import React, {useState, useEffect} from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({onClose, isOpen, onAddPlace}) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({name, link});

    onClose();
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm title='Новое место' name={'add-card'} onSubmit={handleSubmit}
                   isOpen={isOpen} btnText={'Создать'} onClose={onClose}>
      <input type="text" value={name || ''} onChange={handleNameChange}
             required id="place-name" minLength="2" maxLength="30" placeholder="Название"
             className="popup__form-item popup__form-item_image_name text-input"/>
      <span className="popup__input-error place-name-error"></span>
      <input type="url" value={link || ''} required id="place-url" placeholder="Ссылка на картинку"
             onChange={handleLinkChange}
             className="popup__form-item popup__form-item_image_url text-input"/>
      <span className="popup__input-error place-url-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;