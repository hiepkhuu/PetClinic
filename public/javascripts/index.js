window.addEventListener("DOMContentLoaded", (event)=>{
    const upVote = document.querySelectorAll(".question-upvote-button");
    const downVote = document.querySelectorAll(".question-downvote-button");

    const upVoteAns = document.querySelectorAll(".answer-upvote-button");
    const downVoteAns = document.querySelectorAll(".answer-downvote-button");

    //addEventListener to each upvote and downvote button for questions
    for (let i = 0; i < upVote.length; i++) {
        upVote[i].addEventListener("click", async (e) => {
            //extract id number from upvote button
            const upVoteArr = upVote[i].id.split("-");
            const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);
            const counter = document.getElementById(`question-counter-${idNum}`);

            const result = await fetch(`/votes/upvote/question/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter.innerHTML = json.voteCount;
        });

        downVote[i].addEventListener("click", async (e) => {
            //extract id number from downvote button
            const downVoteArr = downVote[i].id.split("-");
            const idNum = parseInt(downVoteArr[downVoteArr.length - 1]);
            const counter = document.getElementById(`question-counter-${idNum}`);

            const result = await fetch(`/votes/downvote/question/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter.innerHTML = json.voteCount;
        });
    }


    //addeventlistener to upvote downvote buttons for answers
    for (let iAns = 0; iAns < upVoteAns.length; iAns++) {
        upVoteAns[iAns].addEventListener("click", async (e) => {
            //extract id number from upvote button
            const upVoteArr = upVoteAns[iAns].id.split("-");
            const idNum = parseInt(upVoteArr[upVoteArr.length - 1]);
            const counter = document.getElementById(`answer-counter-${idNum}`);

            const result = await fetch(`/votes/upvote/answer/${idNum}`, {
                method: "PATCH"
            });
            const json = await result.json();

            counter.innerHTML = json.voteCount;
        });

        downVoteAns[iAns].addEventListener("click", async (e) => {
            //extract id number from downvote button
            const downVoteArr = downVoteAns[iAns].id.split("-");
            const idNum = parseInt(downVoteArr[downVoteArr.length - 1]);
            const counter = document.getElementById(`answer-counter-${idNum}`);

            const result = await fetch(`/votes/downvote/answer/${idNum}`, {
                method: "PATCH"
            });

            const json = await result.json();

            counter.innerHTML = json.voteCount;
        });
    }

});
