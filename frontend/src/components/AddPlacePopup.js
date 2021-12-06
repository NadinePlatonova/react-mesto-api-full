import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
    const [name, setName] = React.useState('');
    const [link, setLink] = React.useState('');

    function handleAddPlaceName(e) {
        setName(e.target.value);
    }

    function handleAddPlaceLink(e){
        setLink(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onAddPlace({
            name,
            link
        })
    }

    React.useEffect(() => {
        setName('');
        setLink('');
    }, [props.isOpen])

    return (
        <PopupWithForm
        title="Новое место"
        name="new-card"
        isOpen={props.isOpen}
        onClose={props.onClose}
        submitButtonText="Создать"
        onSubmit={handleSubmit}>
            <div className="popup__container">
                    <label className="popup__label">
                        <input value={name || ""} onChange={handleAddPlaceName} type="text" name="place" id="place" placeholder="Название" className="popup__text popup__text_type_place" required minLength="2" maxLength="30" />
                        <span className="popup__error" id="place-error"></span>
                    </label>
                    <label className="popup__label">
                        <input value={link || ""} onChange={handleAddPlaceLink} type="url" name="link" id="link" placeholder="Ссылка на картинку" className="popup__text popup__text_type_link" required />
                        <span className="popup__error" id="link-error"></span>
                    </label>
            </div>
        </PopupWithForm>
    )
}

export default AddPlacePopup;