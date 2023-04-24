import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext);

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onUpdateUser({name: name, about: description});
    }
    return(
        <PopupWithForm name="edit-profile" title="Редактировать профиль" isOpen={props.isOpen} onClose={props.onClose} onSubmitForm={handleSubmit} buttonText='Сохранить'>
            <>
                <input type="text" id="name-input" defaultValue={currentUser.name} onChange={handleChangeName} required className="popup__input popup__input_type_name" minLength="2" maxLength="40" placeholder="Имя" />
                <span className="name-input-error"></span>
                <input type="text" id="description-input" defaultValue={currentUser.about} onChange={handleChangeDescription} required className="popup__input popup__input_type_description" minLength="2" maxLength="200" placeholder="О себе" />
                <span className="description-input-error"></span>
            </>
        </PopupWithForm>
    );
}

export default EditProfilePopup;