const questions = [
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Rome"],
        answer: "Paris"
    },
    {
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Saturn", "Jupiter", "Uranus"],
        answer: "Jupiter"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Vatican City", "Monaco", "Nauru", "Tuvalu"],
        answer: "Vatican City"
    },
    {
        question: "What is the largest living species of lizard?",
        options: ["Komodo dragon", "Saltwater crocodile", "Black mamba", "Green anaconda"],
        answer: "Komodo dragon"
    },
    {
        question: "What is the highest mountain peak in the solar system?",
        options: ["Mount Everest", "Olympus Mons", "Mauna Kea", "Denali"],
        answer: "Olympus Mons"
    }
];

let progress = sessionStorage.getItem("progress");
if (!progress) {
    progress = {};
    questions.forEach((question, index) => {
        progress[index] = null;
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
}

const quizForm = document.getElementById("quiz-form");
const submitBtn = document.getElementById("submit-btn");
const scoreDisplay = document.getElementById("score-display");

questions.forEach((question, index) => {
    const questionElement = document.createElement("div");
    questionElement.className = "question";
    questionElement.innerHTML = `${index + 1}. ${question.question}`;
    quizForm.appendChild(questionElement);

    question.options.forEach((option, optionIndex) => {
        const optionElement = document.createElement("div");
        optionElement.className = "option";
        optionElement.innerHTML = `<input type="radio" name="question-${index}" value="${option}"> ${option}`;
        questionElement.appendChild(optionElement);
    });
});

submitBtn.addEventListener("click", () => {
    let score = 0;
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption && selectedOption.value === question.answer) {
            score++;
        }
    });
    scoreDisplay.textContent = `Your score is ${score} out of 5`;
    localStorage.setItem("score", score);
});

// load saved progress
progress = JSON.parse(sessionStorage.getItem("progress"));
questions.forEach((question, index) => {
    const selectedOption = progress[index];
    if (selectedOption) {
        const optionElement = document.querySelector(`input[name="question-${index}"][value="${selectedOption}"]`);
        optionElement.checked = true;
    }
});

// save progress on change
quizForm.addEventListener("change", () => {
    progress = {};
    questions.forEach((question, index) => {
        const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
        if (selectedOption) {
            progress[index] = selectedOption.value;
        }
    });
    sessionStorage.setItem("progress", JSON.stringify(progress));
});