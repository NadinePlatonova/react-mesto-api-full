import React from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, props.isOpen])

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
            name,
            about: description
        });
    }

    function handleEditName(e) {
        setName(e.target.value);
    }

    function handleEditDescription(e){
        setDescription(e.target.value);
    }


    return (
        <PopupWithForm
        title="Редактировать профиль"
        name="edit"
        isOpen={props.isOpen}
        onClose={props.onClose}
        submitButtonText="Сохранить"
        onSubmit={handleSubmit}>
        <div className="popup__container">
                <label className="popup__label">
                    <input value={name || ""} onChange={handleEditName} type="text" name="name" id="owner-name" placeholder="Имя" className="popup__text popup__text_type_name" required minLength="2" maxLength="40" />
                    <span className="popup__error" id="owner-name-error"></span>
                </label>
                <label className="popup__label">
                    <input value={description || ""} onChange={handleEditDescription} type="text" name="role" id="owner-role" placeholder="О себе" className="popup__text popup__text_type_role" required minLength="2" maxLength="200" />
                    <span className="popup__error" id="owner-role-error"></span>
                </label>          
        </div>
    </PopupWithForm>
    )
}

export default EditProfilePopup;