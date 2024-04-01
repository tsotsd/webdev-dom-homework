import {eventeLikesButtons} from "./eventeLikesButtons.js";
import {comments} from "./getComments.js";
import {initListnerAddComment} from "./initListnerAddComment.js";


const listElement = document.getElementById("list");

export const renderComment = () => {
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
    listElement.innerHTML = commentHtml;
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