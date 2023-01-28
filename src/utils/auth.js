import { BASE_URL } from './constant';

function testStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(res.status);
}

export function register(name, email, password) {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    })
  })
    .then((res) => testStatus(res));
}

export function authorize(email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
    .then((res) => testStatus(res));
};

export function getContent() {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then((res) => testStatus(res));
};

export function logoff() {
  return fetch(`${BASE_URL}/logoff`, {
    method: "POST",
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => testStatus(res));
};