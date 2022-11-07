class ApiMov {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    };

    //Загрузка информации о пользователе с сервера
    getMovies() {
        return fetch(`${this._baseUrl}`, {
            credentials: 'include',
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
const apiMov = new ApiMov({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json',
    }
});
export default apiMov