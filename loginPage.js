import { login, setToken, token } from "./api.js";

export const renderLogin = () => {
    const appElement = document.getElementById("app")
    const loginHtml = `
    <div class="add-form">
    <h2>Форма входа</h2>
    <div class="form-entrance-title">
        <input type="text" id="login-input" class="login-name add-form-name" placeholder="Логин" /> 
        <input type="password" id="password-input" class="password-name add-form-name" placeholder="Пароль" />
        <br>
        <div class="sign-in-comments">
            <button id="sign-in" class="add-form-button">Войти</button>
        </div>
    </div>  
</div>
<br> <a class="link-login" href="index.html">Перейти на список комментарии</a>
    `
    appElement.innerHTML = loginHtml;
}



const buttonElement = document.getElementById("sign-in");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

console.log(buttonElement);
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


