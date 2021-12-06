import React from 'react';

function PopupWithForm(props) {
    return (
        <section className={`popup ${props.isOpen ? 'popup_opened' : ''} popup_type_${props.name}`}>
        <div className="popup__container">
            <button type="button" className="popup__close" aria-label="Закрыть попап" onClick={props.onClose}></button>
            <h2 className="popup__title">{props.title}</h2>
            <form className="popup__form" action="#" name={props.name} onSubmit={props.onSubmit}>
                {props.children}
                <button type="submit" className="popup__submit-button" aria-label={props.submitButtonText}>{props.submitButtonText}</button>
            </form>
        </div>
        </section>
    )
}

export default PopupWithForm;