import { getTodos, postTodo } from "./api.js";


const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-textarea");

const loadingCommentTitle = document.querySelector(".loading-title");
const loadingCommentElement = document.getElementById("loading-comment");
const addFormElement = document.querySelector(".hidden-add-form");

loadingCommentElement.style.display = "none";
// Получаем данные с сервера
// const urlApi = "https://wedev-api.sky.pro/api/v1/oleg-petrov/comments";

function getComments() {
        getTodos().then((responseData) => {
            const appComments = responseData.comments.map((comment) => {
                return {
                    name: comment.author.name,
                    date:
                        new Date(comment.date).toLocaleDateString("default", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                        }) +
                        " " +
                        new Date().toLocaleTimeString().slice(0, -3),
                    text: comment.text,
                    likes: comment.likes,
                    isLikes: false,
                };
            });
            comments = appComments;
            loadingCommentTitle.style.display = "none";
            renderComment();
        })
        .catch((error) => {
                // alert(error)
                if (error.message === "Failed to fetch") {
                  alert("Упал интернет");
              } else {
                  alert(error.message);
              }
        });
}

//Вызов функции и массив
getComments();
let comments = [];

// Лайк
const eventeLikesButtons = () => {
    const likesButtons = document.querySelectorAll(".like-button");
    for (const likesButton of likesButtons) {
        const index = likesButton.dataset.index;
        likesButton.addEventListener("click", () => {
            if (!comments[index].isClick) {
                comments[index].isClick = true;
                comments[index].active = "-active-like";
                comments[index].likes += 1;
            } else {
                comments[index].isClick = false;
                comments[index].active = "";
                comments[index].likes -= 1;
            }
            renderComment();
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
};

renderComment();

buttonElement.addEventListener("click", () => {
    nameInputElement.classList.remove("error");
    commentInputElement.classList.remove("error");

    if (nameInputElement.value === "" || nameInputElement.value.trim() == "") {
        nameInputElement.classList.add("error");
        return;
    } else if (
        commentInputElement.value === "" ||
        commentInputElement.value.trim() == ""
    ) {
        commentInputElement.classList.add("error");
        return;
    }

    loadingCommentElement.style.display = "block";
    addFormElement.style.display = "none";

          postTodo({
            commentApi: commentInputElement.value,
            nameApi: nameInputElement.value,
            
          }).then(() => {
            loadingCommentElement.style.display = "none";
            addFormElement.style.display = null;
            nameInputElement.value = "";
            commentInputElement.value = "";
            return getComments();
        })
        .catch((error) => {
            if (error.message === "Failed to fetch") {
              alert("Упал интернет");
            } else {
              alert(error.message); 
            }            
            loadingCommentElement.style.display = "none";
            addFormElement.style.display = null;
        });

});
