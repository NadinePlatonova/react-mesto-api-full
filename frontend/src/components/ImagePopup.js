import React from 'react';

function ImagePopup(props) {
    return (
        <section className={`popup popup_dark popup_type_image ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__image-container">
                <button type="button" className="popup__close" aria-label="Закрыть попап" onClick={props.onClose}></button>
                <img className="popup__image" src={props.card ? props.card.link : '#'} alt={props.card ? props.card.name : '#'} />
                <h2 className="popup__name">{props.card ? props.card.name : ''}</h2>
            </div>
        </section>
    )
}

export default ImagePopup;