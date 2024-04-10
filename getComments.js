import { getTodos } from "./api.js";
import { renderComment } from "./renderComment.js";

export let comments = [];
export let setComments = newComments => {
    comments = newComments;
}

export function getComments() {
// const loadingCommentElement = document.getElementById("loading-comment");
// loadingCommentElement.style.display = "none";

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
        setComments(appComments)
        
        
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

