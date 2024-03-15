"use strict";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-textarea");

const comments = [
  {
    name: "Глеб Фокин",
    text: "Это будет первый комментарий на этой странице",
    date: "12.02.22 12:18",
    isClick: false,
    likes: 3,
    isEdit: false,
  },
  {
    name: "Варвара Н.",
    text: "Мне нравится как оформлена эта страница! ❤",
    date: "13.02.22 19:22",
    isClick: false,
    likes: 75,
    isEdit: false,
  },
];
// Ответ на комментарий
const replyComment = () => {
  const commentElements = document.querySelectorAll(".comment-text");

  for (const commentElement of commentElements) {
    commentElement.addEventListener("click", () => {
      const index = commentElement.dataset.index;
      let commentInputElement = document.querySelector(".add-form-text");
      commentInputElement.value = `${comments[index].text} \n ${comments[index].name}`;
    });
  }
};

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

const initDeleteButtonsListeners = () => {
  const deleteButtonElements = document.querySelectorAll(".delete-button");
  for (const deleteButtonElement of deleteButtonElements) {
    deleteButtonElement.addEventListener("click", () => {
      const index = deleteButtonElement.dataset.index;
      console.log(index);
      comments.splice(index, 1);
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
    <button data-index="${index}" class="delete-button add-form-button">Удалить</button>
  </li>`;
    })
    .join("");
  listElement.innerHTML = commentHtml;
  initDeleteButtonsListeners();
  eventeLikesButtons();
  replyComment();
};

renderComment();

buttonElement.addEventListener("click", () => {
  nameInputElement.classList.remove("error");
  commentInputElement.classList.remove("error");

  if (
    nameInputElement.value === "" ||
    nameInputElement.value.trim() == ""
  ) {
    nameInputElement.classList.add("error");
    return;
  } else if (
    commentInputElement.value === "" ||
    commentInputElement.value.trim() == ""
  ) {
    commentInputElement.classList.add("error");
    return;
  }
  
  let date = new Date().toLocaleDateString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  let time = new Date().toLocaleTimeString().slice(0, -3);
  let currentDate = date + " " + time;

  comments.push({
    name: nameInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    date: currentDate,
    text: commentInputElement.value
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;"),
    likes: 0,
    isEdit: false,
    isClick: false,
  });
  nameInputElement.value = "";
  commentInputElement.value = "";
  renderComment();
});