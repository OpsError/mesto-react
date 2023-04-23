import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeLink(e) {
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onAddPlace({name, link});
    }

    return(
        <PopupWithForm name="form-add" title="Новое место" isOpen={props.isOpen} onClose={props.onClose} onSubmitForm={handleSubmit} buttonText='Создать'>
            <>
                <input type="text" name="name" id="title-input" required defaultValue="" onChange={handleChangeName} placeholder="Название" className="popup__input popup__input_type_title" minLength="2" maxLength="30" />
                <span className="title-input-error"></span>
                <input type="url" name="link" id="link-input" required defaultValue="" onChange={handleChangeLink} placeholder="Ссылка на картинку" className="popup__input popup__input_type_link" />
                <span className="link-input-error"></span>
            </>
        </PopupWithForm>
    );
}

export default AddPlacePopup;