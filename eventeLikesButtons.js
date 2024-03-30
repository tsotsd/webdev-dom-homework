import {renderComment} from "./renderComment.js";

// Лайк
export const eventeLikesButtons = ({ comments }) => {
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
