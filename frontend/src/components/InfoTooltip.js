import React from 'react';
import failure from '../images/failure.svg';
import success from '../images/success.svg';

function InfoTooltip(props) {
    return (
        <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_type_infoTooltip">
                <button type="button" className="popup__close" aria-label="Закрыть попап" onClick={props.onClose}></button>
                <img src={props.isSuccess ? success : failure} alt={props.isSuccess ? "Картинка с галочкой" : "Картинка с крестиком"} className="popup__infoTooltip-image" />
                <p className="popup__infoTooltip-text">{props.isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p>
            </div>
        </section>
    )
}

export default InfoTooltip;