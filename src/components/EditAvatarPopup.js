import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    const avatarRef = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        console.log(avatarRef.current.value);
        props.onUpdateAvatar(avatarRef.current.value);
    }

    return(
        <PopupWithForm name="patch" title="Обновить аватар" isOpen={props.isOpen} onClose={props.onClose} onSubmitForm={handleSubmit} buttonText='Сохранить'>
            <>
                <input type="url" name="about" id="url-input" required defaultValue="" ref={avatarRef} placeholder="Ссылка на картинку" className="popup__input popup__input_type_url" />
                <span className="url-input-error"></span>
            </>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;