import {postTodo} from "./api.js";
import {toCorrectVulnerability} from "./correctVulnerability.js";
import {getComments} from "./main.js";

const loadingCommentElement = document.getElementById("loading-comment");



export function initListnerAddComment() {
    const buttonElement = document.getElementById("add-button");
    const nameInputElement = document.getElementById("name-input");
    const commentInputElement = document.getElementById("comment-textarea");
    const addFormElement = document.querySelector(".hidden-add-form");

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
            commentApi: toCorrectVulnerability(commentInputElement.value),
            nameApi: toCorrectVulnerability(nameInputElement.value),

        }).then(() => {
            loadingCommentElement.style.display = "none";
            addFormElement.style.display = null;
            nameInputElement.value = "";
            commentInputElement.value = "";
            getComments();
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
}