import { MOV_URL } from './constant';

class ApiMov {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._headers = options.headers
    };

    //Загрузка информации о пользователе с сервера
    getMovies() {
        return fetch(`${this._baseUrl}`, {
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
const apiMov = new ApiMov({
    baseUrl: MOV_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});
export default apiMov