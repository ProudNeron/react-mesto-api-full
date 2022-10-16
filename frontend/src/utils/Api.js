import {serverUrl} from "./consts.js";

class Api {
  constructor({url, headers}) {
    this._url = url;
    this._headers = headers;
  }

  _checkServerResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(res.statusMessage);
  }

  getAllCards(token) {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
    }).then(res => this._checkServerResponse(res));
  }

  postCard({name, link}, token) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({name: name, link: link})
    }).then(res => this._checkServerResponse(res));
  }

  deleteCard(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => this._checkServerResponse(res));
  }

  getProfileData(token) {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
    }).then(res => this._checkServerResponse(res));
  }

  patchProfileData({name, about}, token) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({name: name, about: about})
    }).then((res) => this._checkServerResponse(res));
  }

  patchProfileAvatar(link, token) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type' : 'application/json',
      },
      body: JSON.stringify({avatar: link})
    }).then((res) => this._checkServerResponse(res));
  }

  putLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => this._checkServerResponse(res));
  }

  deleteLike(cardId, token) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => this._checkServerResponse(res));
  }
}

const api = new Api({
  url: serverUrl,
});

export {api};
