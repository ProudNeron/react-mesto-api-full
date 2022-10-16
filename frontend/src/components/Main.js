import {useContext} from "react";
import Card from "./Card.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onEditAvatar, onCardClick, onAddPlace, onCardLike, onDeleteBtn, cards}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <img src={`${currentUser?.avatar}`} alt="аватарка" className="profile__image"/>
        <button type="button" aria-label="изменить аватар"
                onClick={onEditAvatar} className="profile__change-avatar-button"></button>
        <div className="profile__user-info">
          <div className="profile__flex-row">
            <h1 className="profile__user-name">{currentUser?.name}</h1>
            <button type="button" aria-label="редактировать профиль" onClick={onEditProfile}
                    className="profile__edit-button"></button>
          </div>
          <p className="profile__about-user">{currentUser?.about}</p>
        </div>
        <button type="button" aria-label="добавить карточку" onClick={onAddPlace}
                className="profile__add-button"></button>
      </section>
      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike}
                  onCardDelete={onDeleteBtn} key={card._id} />)
          )}
        </ul>
      </section>
    </main>
  );
}

export default Main;