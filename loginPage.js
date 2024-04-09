import { login, setToken, token } from "./api.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app")
    const loginHtml = `
    <h1>Страница входа</h1>
    <div class="form-entrance">
        <div class="form-entrance-title">
            <input type="text" id="login-input" class="login-name" placeholder="Логин" />
            <input type="password" id="password-input" class="password-name" placeholder="Пароль" />
            <button id="sign-in" class="sign-in-comments">Войти</button>
        </div>  
        <br> <a class="link-login" href="index.html">Перейти на список комментарии</a>
    </div>
    `
    appElement.innerHTML = loginHtml;
}



const buttonElement = document.getElementById("sign-in");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

console.log(loginInputElement);

buttonElement.addEventListener("click", () => {
  login({
    login: loginInputElement.value,
    password: passwordInputElement.value,
  }).then((responseData) => {
    console.log(token);
    setToken(responseData.user.token)
    console.log(token);
  });
});
