export const BASE_URL = 'http://api.platonova.mesto.nomoredomains.rocks';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
    })
    .then(checkResponseStatus)
}

export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({email, password})
    })
    .then(checkResponseStatus)
    // .then((data) => {
    //     if (data.token) {
    //         localStorage.setItem('token', data.token);
    //         return data;
    //     }
    // })
}

export const getContent = () => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
    })
    .then(checkResponseStatus)
    // .then(data => data)
}

function checkResponseStatus(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
}