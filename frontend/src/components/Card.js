import React from "react";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (card.owner._id == currentUser._id);
  const isLiked = card.likes.some(j => j._id == currentUser._id);


  return (
    <li className="card">
      <img src={card.link} alt={card.name}
           onClick={() => {onCardClick({link: card.link, name: card.name})}}
           className="card__image" />
      {isOwn && <button type="button" aria-label="Удалить карточку"
                       onClick={() => onCardDelete(card._id)} className="card__delete-btn"></button>}
      <div className="card__info">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__reaction">
          <button type="button" aria-label="Нравится" onClick={() => {onCardLike(card)}} className={`card__like-button 
            ${isLiked ? 'card__like-button_active' : ''}`}></button>
          <span className="card__like-counter">{card.likes.length || ''}</span>
        </div>
      </div>
    </li>);
}

export default Card;