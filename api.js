const urlApi = "https://wedev-api.sky.pro/api/v2/oleg-petrov/comments";
const userUrl = "https://wedev-api.sky.pro/api/user/login";

export let token;

export const setToken = (newToken) => {
  token = newToken;
};

export function getTodos() {
  return fetch(urlApi, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`
    },
  }).then((response) => {
    // console.log(response)
    // return response.json();
    if (response.status === 500) {
      throw new Error("Нет подключения к интернету");
    } else {
      return response.json();
    }
  });
}

export function postTodo({ commentApi, nameApi }) {
  return fetch(urlApi, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      text: commentApi,
      name: nameApi,
      forceError: true,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Имя и комментарий должны содержать хотя бы 3 символа");
    }
    if (response.status === 500) {
      throw new Error("Сервер упал");
    }
    return response.json();
  });
}

export function login({ login, password }) {
  return fetch(userUrl, {
    method: "POST",
    headers: {
        Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    return response.json();
  });
}
