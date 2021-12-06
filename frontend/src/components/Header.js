import React from 'react';
import logo from '../images/logo.png';
import { Route, Switch, Link } from 'react-router-dom';

function Header(props) {

    return (
        <header className="header">
        <img className="header__logo" src={logo} alt="Логотип Место" />
        <Switch>
            <Route exact path="/">
                    <div className="header__list">
                        <p className="header__item">{props.email}</p>
                        <button className="header__item header__link" onClick={props.onSignOut}>Выйти</button>
                    </div>
            </Route>

            <Route path="/sign-in">
                    <Link to="/sign-up" className="header__item header__link">Регистрация</Link>
            </Route>

            <Route path="/sign-up">
                    <Link to="/sign-in" className="header__item header__link">Войти</Link>
            </Route>
        </Switch>
        </header>
    )
}

export default Header