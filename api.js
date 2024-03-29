import { toCorrectVulnerability } from "./correctVulnerability.js";

const urlApi = "https://wedev-api.sky.pro/api/v1/oleg-petrov/comments";

export function getTodos() {
    return fetch(urlApi, {
        method: "GET",
    })
        .then((response) => {
              // console.log(response)
            // return response.json();
            if (response.status === 500) {
              throw new Error("Нет подключения к интернету")
          } else {
              return response.json();
          }
        })
}

export function postTodo({ commentApi, nameApi}) {
    return fetch(urlApi, {
        method: "POST",
        body: JSON.stringify({
            text: toCorrectVulnerability(commentApi),
            name: toCorrectVulnerability(nameApi),
            forceError: true,
        }),
    })
        .then((response) => {
            console.log(response);
            if (response.status === 400) {
              throw new Error("Имя и комментарий должны содержать хотя бы 3 символа")
            } else if (response.status === 500) { 
              throw new Error("Сервер упал") 
            } else {
                console.log("Успешно")
                return; 
            }
        })
}