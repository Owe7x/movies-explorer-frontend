const BASE_URL = "https://owe6x.nomoredomains.xyz";

export const register = ({name, email, password}) => {
    return fetch(`${BASE_URL}/signup`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            name: name,
            email: email,
            password: password
        }),
    })
    .then((res) => checkError(res));
};

export const login = ({ email, password }) => {
    console.log(email, password);
    return fetch(`${BASE_URL}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        }),
        })

        .then((res) => checkError(res));
}

export const getSaveMovies = (token) => {
    console.log(token);
    return fetch(`${BASE_URL}/movies`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => checkError(res));
}

export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }
    }).then((res) => checkError(res));
}


export const changeProfile = ({ jwt, name, email }) => {
    console.log(jwt, name, email);
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    }).then((res) => checkError(res));
}

export const setSaveMovie = ({jwt , movie}) => {
    console.log(movie);
    return fetch(`${BASE_URL}/movies`, {
        method: "POST",
        credentials: "include",
        headers: {
            'Content-Type': 'application/json', 
            "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `https://api.nomoreparties.co${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: movie.trailerLink,
            movieId: movie.id,
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        }),
    })
        .then((res) => checkError(res));
};

export const deleteSaveMovie = ({ jwt, movieId }) => {
    console.log(movieId);
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt}`
        }
    }).then((res) => checkError(res));
}

const checkError = (res) =>{
    if (res.ok) {
        return res.json();
    }
    console.log(res);
    return Promise.reject(`Ошибка: ${res.status} : ${res.statusText}`);
}