let startButton = document.querySelector(".start");
let gameArea = document.getElementById("gameArea");
let questionText = document.getElementById("question");
let answerBox = document.getElementById("answerBox");
let resultText = document.getElementById("result");
let submitButton = document.getElementById("submitAnswer");
let totalQuestions = 10;     
let currentQuestion = 0;     
let score = 0;

let correctAnswer = 0;

function newQuestion() {

    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }

    currentQuestion++;


    let a = Math.floor(Math.random() * 21);
    let b = Math.floor(Math.random() * 21);

    let isAddition = Math.random() < 0.5;

    if (isAddition) {
        questionText.textContent = `${a} + ${b} = ?`;
        correctAnswer = a + b;
    } else {
        if (b > a) {
            [a, b] = [b, a];
        }

        questionText.textContent = `${a} - ${b} = ?`;
        correctAnswer = a - b;
    }
}

startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    gameArea.style.display = "block";
    newQuestion();
});

submitButton.addEventListener("click", () => {
    let answer = Number(answerBox.value);

    if (answer === correctAnswer) {
        resultText.textContent =  "✅ Oikein!";
        resultText.style.color = "green";
        score++;
    } else {
        resultText.textContent = `❌ Väärin! Oikea vastaus oli ${correctAnswer}`;
        resultText.style.color = "red";
    }

    setTimeout(() => {
        resultText.textContent = "";
        answerBox.value = "";
        newQuestion();
    }, 3000);
});

function endGame() {
    sessionStorage.setItem("game4-score", score);

    questionText.textContent = `Peli päättyi! Tuloksesi: ${score} / ${totalQuestions}`;
    answerBox.style.display = "none";
    submitButton.style.display = "none";
}