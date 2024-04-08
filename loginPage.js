import { login, setToken, token } from "./api.js";

const buttonElement = document.getElementById("sign-in");
const loginInputElement = document.getElementById("login-input");
const passwordInputElement = document.getElementById("password-input");

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
