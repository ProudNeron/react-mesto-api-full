import {useState, useEffect} from "react";
import {Routes, Route, useNavigate, Navigate} from "react-router-dom";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import ImagePopup from "./ImagePopup.js";
import {api} from "../utils/Api";
import {CurrentUserContext} from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import SubmitPopup from "./SubmitPopup";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import {getContent, register, signin} from "../utils/AuthApi";
import {okInfo, notOkInfo} from "../utils/consts";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const [isEditProfilePopupOpen, setEditProfilePopupOpenState] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupState] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupState] = useState(false);
  const [isInfoPopupOpen, setInfoPopupOpen] = useState(false);
  const [isSuccessRegister, setSuccessRegister] = useState(false);
  const [deletingCardId, setDeletingCardId] = useState('');
  const [selectedCard, setSelectedCardState] = useState(null);
  const [currentUser, setCurrentUser] = useState({name: '', about: '', avatar: '', cohort: '', _id: ''});
  const [cards, setCardsState] = useState([]);

  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    handleCheckToken();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getProfileData(token), api.getAllCards(token)])
        .then(([profileData, dataCards]) => {
          setCurrentUser(profileData);
          dataCards.sort((j, k) => Date.parse(k.createdAt) - Date.parse(j.createdAt));
          setCardsState(dataCards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleEditAvatarClick() {
    setEditAvatarPopupState(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpenState(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupState(true);
  }

  function handleCardClick(card) {
    setSelectedCardState(card);
  }

  function handleDeleteBtnClick(cardId) {
    setDeletingCardId(cardId);
  }

  function closeAllPopups() {
    setEditAvatarPopupState(false);
    setEditProfilePopupOpenState(false);
    setAddPlacePopupState(false);
    setInfoPopupOpen(false);
    setDeletingCardId('');
    setSelectedCardState(null);
  }

  function handleUpdateUser({name, about}) {
    api.patchProfileData({name, about}, token).then((data) => {
      setCurrentUser(data);
    }).catch(err => alert(err));
  }

  function handleUpdateAvatar(link) {
    api.patchProfileAvatar(link, token).then((data) => {
      setCurrentUser(data);
    }).catch(err => alert(err));
  }

  function handleAddPlaceSubmit({name, link}) {
    api.postCard({name, link}, token).then((newCard) => {
      setCardsState((prevState) => [newCard, ...prevState]);
    }).catch(err => alert(err));
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(j => j == currentUser._id);

    if (isLiked) {
      api.deleteLike(card._id, token).then((newCard) => {
        setCardsState((state) => state.map(c => c._id == card._id ? newCard : c));
      }).catch(err => alert(err));
    } else {
      api.putLike(card._id, token).then((newCard) => {
        setCardsState((state) => state.map(c => c._id == card._id ? newCard : c));
      }).catch(err => alert(err));
    }
  }

  function handleCardDelete() {
    api.deleteCard(deletingCardId, token).then(() => {
      setCardsState((prevState) => prevState.filter(c => c._id != deletingCardId));
    }).catch(err => alert(err));
  }

  function handleRegister({email, password}) {
    return register({email, password}).then((res) => {
      setUserEmail(res.data);
      navigate('/');
      setSuccessRegister(true);
      setInfoPopupOpen(true);
    }).catch(() => {
      setSuccessRegister(false);
      setInfoPopupOpen(true);
    });
  }

  function handleAuthorization({email, password}) {
    return signin({email, password}).then((res) => {
      setLoggedIn(true);
      localStorage.setItem('token', res["token"]);
      setUserEmail(email);
      navigate('/');
    }).catch(() => {
      setSuccessRegister(false);
      setInfoPopupOpen(true);
    });
  }

  function handleCheckToken() {
    const token = localStorage.getItem('token');
    if (token) {
      getContent(token).then((res) => {
        setUserEmail(res.data);
        setLoggedIn(true);
        navigate('/');
      }).catch(err => alert(err));
    }
  }

  function logOut() {
    localStorage.removeItem('token');
    setUserEmail('');
    setLoggedIn(false);
    navigate('/signin');
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header logOut={logOut} email={currentUser?.email}/>
        <Routes>
          <Route path="/" element={<ProtectedRoute loggedIn={loggedIn}>
            <Main cards={cards} onEditProfile={handleEditProfileClick}
                  onCardLike={handleCardLike} onDeleteBtn={handleDeleteBtnClick}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick} onCardClick={handleCardClick}/></ProtectedRoute>}/>
          <Route path="/signin" element={<Login handleAuthorization={handleAuthorization}/>}/>
          <Route path="/signup" element={<Register handleRegister={handleRegister}/>}/>
          <Route path="*" element={loggedIn ? <Navigate to='/'/> : <Navigate to='/signin'/>}/>
        </Routes>
        <Footer/>
      </div>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
      <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}/>
      <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}/>
      <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
      <SubmitPopup onCardDelete={handleCardDelete} isOpen={deletingCardId} onClose={closeAllPopups}/>
      <InfoToolTip isOk={isSuccessRegister} isOpen={isInfoPopupOpen} onClose={closeAllPopups}
                   textInfo={ isSuccessRegister ? okInfo : notOkInfo}/>
    </CurrentUserContext.Provider>
  );
}

export default App;
