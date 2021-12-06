import React from 'react';
import Card from './Card';
import CurrentUserContext from '../contexts/CurrentUserContext';


function Main(props) {
    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__info">
                    <img className="profile__avatar" src={currentUser.avatar} alt="Аватар профиля" />
                    <div className="profile__button-background">
                        <button type="button" className="profile__edit-avatar" aria-label="Редактировать аватар" onClick={props.onEditAvatar}></button>
                    </div> 
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <p className="profile__role">{currentUser.about}</p>
                    <button type="button" className="profile__edit-button" aria-label="Редактировать профиль" onClick={props.onEditProfile}></button>
                </div>
                <button type="button" className="profile__add-button" onClick={props.onAddPlace}></button>
            </section>

            <section className="elements">
                <ul className="elements__list">
                    {props.cards.map((item) => {
                        return (
                            <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
                        )
                    })}
                </ul>
            </section>
        </main>
    )
}

export default Main