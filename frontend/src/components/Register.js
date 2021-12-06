import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handlePasswordEdit(e) {
        setPassword(e.target.value);
    }

    function handleEmailEdit(e) {
        setEmail(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password)
    }

    return (
        <div className="reg-login">
            <div className="reg-login__container">
                <h2 className="reg-login__title">Регистрация</h2>
                <form className="reg-login__form" name="login" action="#" onSubmit={handleSubmit}>
                    <input value={email} onChange={handleEmailEdit} className="reg-login__input" id="email" name="email" type="email" placeholder="Email" required></input>
                    <input value={password} onChange={handlePasswordEdit} className="reg-login__input" id="password" name="password" type="password" placeholder="Пароль" required></input>
                    <button className="reg-login__button" type="submit">Зарегистрироваться</button>
                </form>
            </div>
            <div className="reg-login__sign-in">
                <p className="reg-login__caption">Уже зарегистрированы? &nbsp;</p>
                <Link to="/sign-in" className="reg-login__link">Войти</Link>
            </div>
        </div>
    )
}

export default Register;