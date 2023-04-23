import React from 'react';
import api from '../utils/Api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';


function App() {
    const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setPlaceOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);
    const [isDeletePopupOpen, setDeleteOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(null);
    const [currentUser, setCurrentUser] = React.useState({});
    const [cards, setCards] = React.useState([]);

    // получение карточек с сервера
    React.useEffect(() => {
        api.getCard()
        .then((res) => {
            setCards(res);
        })
        .catch((res) => {
            console.log(res);
        });
    });

    // получение данных пользователя с сервера
    React.useEffect(() => {
        api.getInfo()
        .then((res) => {
            setCurrentUser(res);
        })
        .catch((res) => {
            console.log(res);
        })
    });

    // поставить/убрать лайк
    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, isLiked).then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    // удаление карточки
    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards(cards.filter(item => item._id !== card._id));
        })
    }

    // открытие попапов
    function handleEditAvatarClick() {
        setAvatarOpen(true);
    }

    function handleEditProfileClick() {
        setProfileOpen(true);
    }

    function handleAddPlaceClick() {
        setPlaceOpen(true);
    }

    // закрытие попапов
    function closeAllPopups() {
        setAvatarOpen(false);
        setProfileOpen(false);
        setPlaceOpen(false);
        setDeleteOpen(false);
        setSelectedCard();
    }

    function closePopupButton(evt) {
        if (evt.target.classList.contains('popup') || (evt.target.classList.contains('popup__close-icon')) || (evt.key === 'Escape')) {
            closeAllPopups();
        }
    }

    // обновление данных профиля
    function handleUpdateUser(data) {
        console.log(data);
        api.patchInfo(data)
        .then((res) => {
            console.log(res);
            setCurrentUser({name: res.name, about: res.about});
            closeAllPopups();
        })
        .catch((res) => {
            console.log(res);
        });
    }

    // обновление аватара
    function handleUpdateAvatar(link) {
        console.log(link);
        api.patchAvatar(link)
        .then((res) => {
            setCurrentUser({avatar: res.avatar});
            closeAllPopups();
        })
        .catch((res) => {
            console.log(res);
        });
    }

    // добавление карточки
    function handleAddPlaceSubmit(data) {
        api.postCard(data)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((res) => {
            console.log(res);
        })
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div className="page__content">
            <Header />
            <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete} />
            <Footer />

            {/*Редактировать профиль  */}
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closePopupButton} onUpdateUser={handleUpdateUser} />

            {/* <!-- Новое место --> */}
            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closePopupButton} onAddPlace={handleAddPlaceSubmit} />

            {/* <!-- попап удаления карточки --> */}
            <PopupWithForm name="delete" title="Вы уверены?" isOpen={isDeletePopupOpen} onClose={closePopupButton} buttonText='Да' />

            {/* <!-- попап обновить аву --> */}
            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closePopupButton} onUpdateAvatar={handleUpdateAvatar} />

            {/* <!-- картинка на весь экран --> */}
            <ImagePopup card={selectedCard} onClose={closePopupButton} />
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
