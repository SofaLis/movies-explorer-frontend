class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    };

    //Загрузка информации о пользователе с сервера
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