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

// Luo uuden random-kysymyksen (kertolasku tai jakolasku)
function newQuestion() {

    if (currentQuestion >= totalQuestions) {
        endGame();
        return;
    }

    currentQuestion++;


    let a = Math.floor(Math.random() * 10) + 1;
    let b = Math.floor(Math.random() * 10) + 1;

    let isMultiplication = Math.random() < 0.5;

    if (isMultiplication) {
        questionText.textContent = `${a} × ${b} = ?`;
        correctAnswer = a * b;
    } else {
        // tehdään jaosta siisti: tulos aina kokonaisluku
        let result = a;
        let divisor = b;
        let dividend = a * b;

        questionText.textContent = `${dividend} ÷ ${divisor} = ?`;
        correctAnswer = result;
    }
}

// Pelaa-nappi näyttää pelialueen
startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    gameArea.style.display = "block";
    newQuestion();
});

// Tarkista vastaus
submitButton.addEventListener("click", () => {
    let answer = Number(answerBox.value);

    if (answer === correctAnswer) {
        resultText.textContent = "Oikein! 🎉";
        resultText.style.color = "green";
        score++;
    } else {
        resultText.textContent = `Väärin! Oikea vastaus oli ${correctAnswer}`;
        resultText.style.color = "red";
    }

    setTimeout(() => {
        resultText.textContent = "";
        answerBox.value = "";
        newQuestion();
    }, 1500);
});

function endGame() {
    
    // tallennus sessionStorageen
    sessionStorage.setItem("game3-score", score);

    // näytä lopputulos
    questionText.textContent = `Peli päättyi! Tuloksesi: ${score} / ${totalQuestions}`;
    answerBox.style.display = "none";
    submitButton.style.display = "none";
}