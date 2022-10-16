function ImagePopup({card, onClose, onCardClick}){
  return (
    <div className={`popup popup_type_img ${card && 'popup_opened'}`}>
      <figure className="popup__image-container">
        <button type="button" aria-label="Закрыть" onClick={onClose} className="popup__closed-btn"></button>
        <img src={card?.link} alt={card?.name}
             onClick={() => {onCardClick(card)}} className="popup__image"/>
        <figcaption className="popup__image-caption">{card?.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;