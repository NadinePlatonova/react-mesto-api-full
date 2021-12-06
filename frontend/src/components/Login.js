import React from 'react';

function Login(props) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailEdit(e) {
        setEmail(e.target.value);
    }

    function handlePasswordEdit(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            return;
        }
        setEmail('');
        setPassword('');
        props.handleLogin(email, password);
    }



    return (
        <div className="reg-login">
            <div className="reg-login__container">
                <h2 className="reg-login__title">Вход</h2>
                <form className="reg-login__form" name="login" action="#" onSubmit={handleSubmit}>
                    <input value={email} onChange={handleEmailEdit} className="reg-login__input" id="email" name="email" type="email" placeholder="Email" required></input>
                    <input value={password} onChange={handlePasswordEdit} className="reg-login__input" id="password" name="password" type="password" placeholder="Пароль" required></input>
                    <button className="reg-login__button" type="submit">Войти</button>
                </form>
            </div>
        </div>
    )
}

export default Login;