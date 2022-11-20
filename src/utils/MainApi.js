import { BASE_URL } from './constant';

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    };

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then((res) => this._testStatus(res));
    };

    setUser = (name, email) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: "include",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                email: email,
            })
        })
        .then((res) => this._testStatus(res));
    }

    like(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            credentials: 'include',
            headers: this._headers,
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: `https://api.nomoreparties.co${movie.image.url}`,
                trailerLink: movie.trailerLink,
                thumbnail: `https://api.nomoreparties.co${movie.image.formats.thumbnail.url}`,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN,
                movieId: movie.id
            })
        })
        .then((res) => this._testStatus(res));
    };

    getLikes() {
        return fetch(`${this._baseUrl}/movies`, {
            credentials: 'include',
            headers: this._headers,
        })
        .then((res) => this._testStatus(res));
    };


    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/${id}`, { 
          method: 'DELETE',
          credentials:'include',
          headers: this._headers,
        })
        .then((res) => this._testStatus(res));
    };



    //Проверяем на ошибку
    _testStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(res.status);
    }

}
const api = new Api({
    baseUrl: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
export default api