"use strict";

const buttonElement = document.getElementById("add-button");
const listElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const commentInputElement = document.getElementById("comment-textarea");

let comments = [
  //   {
  //     name: "Глеб Фокин",
  //     text: "Это будет первый комментарий на этой странице",
  //     date: "12.02.22 12:18",
  //     isClick: false,
  //     likes: 3,
  //     isEdit: false,
  //   },
  //   {
  //     name: "Варвара Н.",
  //     text: "Мне нравится как оформлена эта страница! ❤",
  //     date: "13.02.22 19:22",
  //     isClick: false,
  //     likes: 75,
  //     isEdit: false,
  //   },
];

const fetchComments = fetch(
  "https://wedev-api.sky.pro/api/v1/oidop-cyndymeev/comments",
  {
    method: "GET",
  }
);

fetchComments.then((response) => {
  const jsonPromise = response.json();
  jsonPromise.then((responseData) => {
    const appComments = responseData.comments.map((comment) => {
      return {
        name: comment.author.name,
        date: new Date(comment.date),
        text: comment.text,
        likes: comment.likes,
        isLikes: false,
      };
    });
    comments = appComments;
    renderComment();
  });
});

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

  let date = new Date().toLocaleDateString("default", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
  let time = new Date().toLocaleTimeString().slice(0, -3);
  let currentDate = date + " " + time;

  const fetchComments = fetch(
    "https://wedev-api.sky.pro/api/v1/oidop-cyndymeev/comments",
    {
      method: "POST",
      body: JSON.stringify({ 
        text: commentInputElement.value, 
        name: nameInputElement.value,
     }),
    }
  );
  fetchComments.then((response) => {
    const jsonPromise = response.json();
    jsonPromise.then((responseData) => {
      const appComments = responseData.comments.map((comment) => {
        return {
          name: comment.author.name,
          date: new Date(comment.date),
          text: comment.text,
          likes: comment.likes,
          isLikes: false,
        };
      });
      comments = appComments;
      renderComment();
    });
  });

  //   comments.push({
  //     name: nameInputElement.value
  //       .replaceAll("&", "&amp;")
  //       .replaceAll("<", "&lt;")
  //       .replaceAll(">", "&gt;")
  //       .replaceAll('"', "&quot;"),
  //     date: currentDate,
  //     text: commentInputElement.value
  //       .replaceAll("&", "&amp;")
  //       .replaceAll("<", "&lt;")
  //       .replaceAll(">", "&gt;")
  //       .replaceAll('"', "&quot;"),
  //     likes: 0,
  //     isEdit: false,
  //     isClick: false,
  //   });
  nameInputElement.value = "";
  commentInputElement.value = "";
  renderComment();
});
