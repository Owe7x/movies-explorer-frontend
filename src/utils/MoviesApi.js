class Api {
    constructor({baseUrl, headers}) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    };
    getMoives() {
        return fetch(`${this.baseUrl}`, {
            headers: this.headers
        })
        .then(this._checkStatus) 
    }
    _checkStatus(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res}`);
    }  
}

const MoviesApi = new Api({
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {'Content-Type': 'application/json'}
});


export default MoviesApi