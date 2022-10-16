import ok from '../images/info-ok.svg';
import notOk from '../images/info-not-ok.svg';

function InfoToolTip({isOk, onClose, isOpen, textInfo}) {
  return (
    <div className={`popup popup_type_info ${isOpen && 'popup_opened'}`}>
      <figure className="popup__image-container popup__image-container_type_info">
        <button type="button" aria-label="Закрыть" onClick={onClose} className="popup__closed-btn"></button>
        <img src={isOk ? ok : notOk} alt={textInfo}
             className="popup__image popup__image_type_info"/>
        <figcaption className="popup__image-caption popup__image-caption_type_info">{textInfo}</figcaption>
      </figure>
    </div>
  );
}

export default InfoToolTip;