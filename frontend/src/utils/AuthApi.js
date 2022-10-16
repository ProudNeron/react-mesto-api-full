import {serverUrl} from "./consts";

function checkServerResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(res.statusMessage);
}

export function register({email, password}) {
  return fetch(`${serverUrl}/signup`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then(res => checkServerResponse(res));
}

export function signin({email, password}) {
  return fetch(`${serverUrl}/signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  }).then(res => checkServerResponse(res));
}

export function getContent(token) {
  return fetch(`${serverUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => checkServerResponse(res));
}
