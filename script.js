import {renderComment} from "./renderComment.js";

// Лайк
export const eventeLikesButtons = ({ comments }) => {
    const likesButtons = document.querySelectorAll(".like-button");
//    console.log(textValue); 
 //   console.log(document.getElementById("comment-textarea"));
    for (const likesButton of likesButtons) {
        const index = likesButton.dataset.index;
        likesButton.addEventListener("click", () => {
            const textValue = document.getElementById("comment-textarea").value;
            if (!comments[index].isClick) {
                comments[index].isClick = true;
                comments[index].active = "-active-like";
                comments[index].likes += 1;
            } else {
                comments[index].isClick = false;
                comments[index].active = "";
                comments[index].likes -= 1;
            }
            renderComment(textValue);
        });
    }
};

const renderComment = () => {
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
    eventeLikesButtons();
    replyComment();
};

renderComment();

const toCorrectVulnerability = (string) => {
    return string
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
};