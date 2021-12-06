import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = props.card.owner._id === currentUser._id;

    const cardDeleteButtonClassName = (
        `element__delete-button ${isOwn ? 'element__delete-button_visible' : ''}`
    );

    const isLiked = props.card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = (
        `element__like-button ${isLiked ? 'element__like-button_active' : ''}`
    );

    function handleClick() {
        props.onCardClick(props.card);
    }

    function handleLikeClick() {
        props.onCardLike(props.card);
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card);
    }

    return (
        <li className="element">
            <button type="button" className={cardDeleteButtonClassName} onClick={handleDeleteClick} aria-label="Удалить"></button>
            <img className="element__image" src={props.card.link} alt={props.card.name} onClick={handleClick} />
            <div className="element__info">
                <h2 className="element__title">{props.card.name}</h2>
                <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Лайк">{props.card.likes.length}</button>
            </div>
        </li>
    )
}

export default Card;