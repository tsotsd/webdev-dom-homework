import {eventeLikesButtons} from "./eventeLikesButtons.js";
import {comments} from "./getComments.js";
import {initListnerAddComment} from "./initListnerAddComment.js";



const listElement = document.getElementById("list");

export const renderComment = () => {
  const appElement = document.getElementById("app");

    const commentHtml = comments
        .map((comments, index) => {
            return `<li class="comment">
    <div class="comment-header">
      <div>${comments.name}</div>
      <div>${comments.date}</div>
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
     
     <div class="login-alert" id="login-alert">Чтобы добавить комментарий, <a id="authorization" href="login.html">авторизуйтесь</a></div>
 
     <div id="loading-comment" class="hidden">Комментарий добавляется...</div>
 
     <div id="add-form-comment" class="add-form hidden-add-form">
       <input type="text" id="name-input" class="add-form-name" placeholder="Введите ваше имя" />
       <textarea type="textarea" id="comment-textarea" class="add-form-text" placeholder="Введите ваш коментарий"
         rows="4"></textarea>
       <div class="add-form-row">
         <button id="add-button" class="add-form-button">Написать</button>
       </div>
     </div>
   </div>`

   appElement.innerHTML = appHtml;
    eventeLikesButtons({comments});
    initListnerAddComment();
    replyComment();
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

