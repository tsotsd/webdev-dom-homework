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

export function toCorrectVulnerability(string) {
  return string
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
};