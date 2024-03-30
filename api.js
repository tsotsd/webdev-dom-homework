import { toCorrectVulnerability } from "./correctVulnerability.js";

const urlApi = "https://wedev-api.sky.pro/api/v1/oidop-cyndymeev/comments";

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

export function postTodo({ commentApi, nameApi }) {
    return fetch(urlApi, {
        method: "POST",
        body: JSON.stringify({
            text: commentApi,
            name: nameApi,
            forceError: true,
        }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error("Имя и комментарий должны содержать хотя бы 3 символа")
            }
            if (response.status === 500) {
                throw new Error("Сервер упал")
            }
            return response.json();
        })
}