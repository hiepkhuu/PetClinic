const upVote = document.querySelectorAll(".question-upvote-button");
const downVote = document.querySelectorAll(".question-downvote-button");

const upVoteAns = document.querySelectorAll(".answer-upvote-button");
const downVoteAns = document.querySelectorAll(".answer-downvote-button");

//addEventListener to each upvote and downvote button for questions
for (let i = 0; i < upVote.length; i++) {
    upVote[i].addEventListener("click", async (e) => {
        //extract id number from upvote button
        e.preventDefault()
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
        e.preventDefault()
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

const answerDeleteButton = document.querySelectorAll(".delete-answer")


answerDeleteButton.forEach(eachButton => {
    eachButton.addEventListener("click", async(event)=> {
        event.preventDefault()
        let answerId = event.target.id

        if(confirm("Delete this answer?")) {
            await fetch(`/answers/${answerId}`, {
                method: 'DELETE'
            })

        }

        window.location.reload()

    })
})


const questionDeleteButton = document.querySelector('.delete-question')
if (questionDeleteButton !== null) {
    questionDeleteButton.addEventListener('click', async (event) => {
        event.preventDefault()
        if(confirm("Delete this question?")) {
            const questionId = event.target.id
            await fetch(`/questions/${questionId}`, {
                method: 'DELETE'
            })
        }
        window.location.reload()
    })
}

// const editButton = document.querySelector('.edit-answer')
// // const answerDescription = document.querySelector('.description')
// const answerContent = document.querySelector('.answer-content')
// if (editButton !==null) {
//     editButton.addEventListener('click', async(event) => {
//         const form = document.createElement('form')
//             form.classList.add('edit-form')
//             answerContent.appendChild(form)

//         const textArea = document.createElement('textarea')
//             textArea.classList.add('edit-text-area')
//             textArea.innerHTML = answerContent.innerHTML
//             form.appendChild(textArea)

//         const submitButton = document.createElement('input')
//             submitButton.classList.add('edit-submit')
//             submitButton.setAttribute('type', 'submit')
//             submitButton.setAttribute('value', 'Submit Edit')
//             form.appendChild(submitButton)


//         answerDescription.remove(answerContent)

//         submitButton.addEventListener('click', async e => {
//             e.preventDefault()
//             const content = { content: textArea.value }

//             await fetch(`/answers/${answerId}`, {
//                 method: 'PUT',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(content),
//             })

//             window.location.reload()
//         })
//     })
// }
