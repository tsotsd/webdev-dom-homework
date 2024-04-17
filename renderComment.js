import { user } from "./api.js";
import {eventeLikesButtons} from "./script.js";
import {comments} from "./getComments.js";
import {initListnerAddComment} from "./initListnerAddComment.js";
import { renderLogin } from "./loginPage.js";
import { format } from "date-fns";

export const renderComment = (textValue = "") => {
  const appElement = document.getElementById("app");

    const commentHtml = comments
        .map((comments, index) => {
            return `<li class="comment">
    <div class="comment-header">
      <div>${comments.name}</div>
      <div>${format(comments.date), "yyyy-MM-dd hh.mm.ss"}</div>
  
      </div>
    <div class="comment-body">
      <div data-index="${index}" class="comment-text">${comments.text}</div>
    </div>
    <div class="comment-footer">
      <div class="likes">
        <span class="likes-counter">${comments.likes}</span>
        <button data-index="${index}" class="like-button ${comments.active}"></button>
      </div>
    </div>
  </li>`;
        })
        .join("");

    const appHtml = `
    <div class="container">
    <div class="loading-title">Пожалуйста подождите, загружаю комментарии...</div>
     <ul id="list" class="comments">${commentHtml}
     </ul>
     <br>
     
     ${user ? `<div id="loading-comment" class="hidden">Комментарий добавляется...</div>
      <div id="add-form-comment" class="add-form hidden-add-form">
       <input type="text" id="name-input" value="${user.name}" class="add-form-name" placeholder="Введите ваше имя" />
       <textarea type="textarea" id="comment-textarea" class="add-form-text" placeholder="Введите ваш коментарий"
         rows="4">${textValue}</textarea>
       <div class="add-form-row">
         <button id="add-button" class="add-form-button">Написать</button>
       </div>
     </div>` : `<div class="login-alert" id="login-alert">Чтобы добавить комментарий, <button id="authorization">авторизуйтесь</button></div>`}
     
   </div>`
        
   appElement.innerHTML = appHtml;
   const loadingCommentTitle = document.querySelector(".loading-title");
    loadingCommentTitle.style.display = "none";    

   if (user) {   
   const nameInput = document.getElementById("name-input");
   eventeLikesButtons({comments});
   initListnerAddComment();
   replyComment();
   nameInput.disabled = true;
  } else {
    const buttonElement = document.getElementById("authorization");
    
    buttonElement.addEventListener("click", () => {
      renderLogin();

    })
    
  }
};

// Ответ на комментарий
export const replyComment = () => {
  const commentElements = document.querySelectorAll(".comment-text");

  for (const commentElement of commentElements) {
      commentElement.addEventListener("click", () => {
          const index = commentElement.dataset.index;
          let commentInputElement = document.querySelector(".add-form-text");
          commentInputElement.value = `${comments[index].text} \n ${comments[index].name}`;
      });
  }
};

