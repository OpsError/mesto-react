import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setProfileOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setPlaceOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setAvatarOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState();

    function handleEditAvatarClick() {
        setAvatarOpen(true);
    }

    function handleEditProfileClick() {
        setProfileOpen(true);
    }

    function handleAddPlaceClick() {
        setPlaceOpen(true);
    }

    function closeAllPopups() {
        setAvatarOpen(false);
        setProfileOpen(false);
        setPlaceOpen(false);
        setSelectedCard();
    }

    function closePopupButton(evt) {
        if (evt.target.classList.contains('popup') || (evt.target.classList.contains('popup__close-icon')) || (evt.key === 'Escape')) {
            closeAllPopups();
        }
    }

  return (

    <div className="page__content">
    <Header />
    <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} onCardClick={setSelectedCard} />
    <Footer />

    {/*Редактировать профиль  */}
    <PopupWithForm name="edit-profile" title="Редактировать профиль" children={[
        <fieldset className="popup__form-set">
            <input type="text" name="title" id="name-input" required defaultValue="" className="popup__input popup__input_type_name" minLength="2" maxLength="40" placeholder="Имя" />
            <span className="name-input-error"></span>
            <input type="text" name="about" id="description-input" required defaultValue="" className="popup__input popup__input_type_description" minLength="2" maxLength="200" placeholder="О себе" />
            <span className="description-input-error"></span>
            <button type="submit" className="popup__save">Сохранить</button>
        </fieldset>
    ]} isOpen={isEditProfilePopupOpen} onClose={closePopupButton} />

    {/* <!-- Новое место --> */}
    <PopupWithForm name="form-add" title="Новое место" children={[
        <fieldset className="popup__form-set">
            <input type="text" name="title" id="title-input" required defaultValue="" placeholder="Название" className="popup__input popup__input_type_title" minLength="2" maxLength="30" />
            <span className="title-input-error"></span>
            <input type="url" name="about" id="link-input" required defaultValue="" placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" />
            <span className="link-input-error"></span>
            <button type="submit" className="popup__save">Создать</button>
        </fieldset> 
    ]} isOpen={isAddPlacePopupOpen} onClose={closePopupButton}/>

    {/* <!-- попап удаления карточки --> */}
    <PopupWithForm name="delete" title="Вы уверены?" children={[
        <button className="popup__save popup__save_type_delete">Да</button>
    ]} isOpen={false} onClose={closePopupButton} />

    {/* <!-- попап обновить аву --> */}
    <PopupWithForm name="patch" title="Обновить аватар" children={[
        <fieldset className="popup__form-set">
            <input type="url" name="about" id="url-input" required defaultValue="" placeholder="Ссылка на картинку" className="popup__input popup__input_type_url" />
            <span className="url-input-error"></span>
            <button className="popup__save">Сохранить</button>
        </fieldset>
    ]} isOpen={isEditAvatarPopupOpen} onClose={closePopupButton} />

    {/* <!-- картинка на весь экран --> */}
    <ImagePopup card={selectedCard} onClose={closePopupButton} />
</div>
  );
}

export default App;
