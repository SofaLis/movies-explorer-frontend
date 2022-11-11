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
            .then((res) => {
                return this._testStatus(res)
            })
    };

    setUser = (name, email) => {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
            })
        })
            .then(this._handleResponse);
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
                movieId: movie.id.toString(),
                nameRU: movie.nameRU,
                nameEN: movie.nameEN
            })
        })
            .then((res) => {
                return this._testStatus(res)
            })
    };

    deleteMovie(id) {
        return fetch(`${this._baseUrl}/movies/{id}`, { 
          method: 'DELETE',
          credentials:'include',
          headers: this._headers,
        })
        .then((res) => {
            return this._testStatus(res)
        })
    };



    //Проверяем на ошибку
    _testStatus(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`${res}`);
    }

}
const api = new Api({
    baseUrl: 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json',
    }
});
export default api