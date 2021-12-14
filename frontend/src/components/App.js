import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import CurrentUserContext from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [currentUser, setCurrentUser] = React.useState({})
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  const [isSuccess, setIsSuccess] = React.useState(true);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

    React.useEffect(() => {
        api.getUserInfo()
        .then((data) => {
            setCurrentUser(data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    React.useEffect(() => {
        api.getInitialCards()
        .then(res => {
            setCards(res)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.putLike(card._id, isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
        .then(() => {
            setCards((state) => state.filter(c => c._id !== card._id));
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsImagePopupOpen(false);
        setIsInfoTooltipOpen(false);
        setSelectedCard({});
    }

    function handleCardClick (card) {
        setSelectedCard(card);
        setIsImagePopupOpen(true);
    }

    React.useEffect(() => {
        const closeByEscape = (e) => {
            if (e.key === 'Escape') {
                closeAllPopups();
            }
        }

        document.addEventListener('keydown', closeByEscape)

        return () => document.removeEventListener('keydown', closeByEscape)
    }, [])

    function handleUpdateUser({name, about}) {
        api.setUserInfo(name, about)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleUpdateAvatar({avatar}) {
        api.setUserAvatar(avatar)
        .then((data) => {
            setCurrentUser(data);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function handleAddPlaceSubmit({name, link}) {
        api.addNewCard(name, link)
        .then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups();
        })
        .catch((err) => {
            console.log(err);
        })
    }

    function onRegister(email, password) {
        auth.register(email, password)
        .then(() => {
            setIsSuccess(true);
            history.push('/sign-in');
        })
        .catch((err) => {
            console.log(err);
            setIsSuccess(false);
        })
        .finally(() => setIsInfoTooltipOpen(true))
    }

    function handleLogin (email, password) {
        auth.authorize(email, password)
            .then(() => {
                checkToken()
            })
            .catch((err) => {
                console.log(err);
            })
    }

    const checkToken = React.useCallback(() => {
        auth.getContent()
            .then(res => {
                setLoggedIn(res != null)
                setUserEmail(res.email)
                history.push('/')
            })
            .catch((err) => {
                console.log(err);
            })
    }, [history]);

    React.useEffect(() => {
        checkToken()
    }, [checkToken]);

    function handleSignOut() {
        setLoggedIn(false);
    }

  return (
    <CurrentUserContext.Provider value={currentUser}>
        <div>  
        <Header email={userEmail} onSignOut={handleSignOut}/>

        <Switch>
            <ProtectedRoute
            exact path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            />
            
            
            <Route exact path="/sign-up">
                <Register onRegister={onRegister}/>
            </Route>
            
            <Route exact path="/sign-in">
                <Login
                handleLogin={handleLogin}
                checkToken={checkToken}
                />
            </Route>
            
        </Switch>

        <Footer />

        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit}/>
            
        <PopupWithForm title="Вы уверены?" name="delete-card" onClose={closeAllPopups} submitButtonText="Да">
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} isOpen={isImagePopupOpen} />
        <InfoTooltip isSuccess={isSuccess} isOpen={isInfoTooltipOpen} onClose={closeAllPopups} /> 
        </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
