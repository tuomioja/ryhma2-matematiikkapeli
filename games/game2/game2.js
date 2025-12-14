let questions = [
    {
        question: "Mikä on neliön pinta-ala, jos sivun pituus on 5 cm?",
        options: ["10 cm²", "15 cm²", "20 cm²", "25 cm²"],
        answer: "25 cm²",
        image: "game2 kuvat/neliö.png"
    },
    {
        question: "Mikä on suorakulmion pinta-ala, jos pituus on 8 cm ja leveys 3 cm?",
        options: ["24 cm²", "30 cm²", "11 cm²", "18 cm²"],
        answer: "24 cm²",
        image: "game2 kuvat/suorakulmio.png"

    },
    {
        question: "Mikä on kolmion pinta-ala, jos kanta on 6 cm ja korkeus 4 cm?",
        options: ["12 cm²", "10 cm²", "14 cm²", "16 cm²"],
        answer: "12 cm²",
        image: "game2 kuvat/kolmio.png"

    },
    {
        question: "Mikä on ympyrän halkaisija, jos säde on 7 cm?",
        options: ["10 cm", "12 cm", "14 cm", "16 cm"],
        answer: "14 cm",
        image: "game2 kuvat/ympyrä.png"

    },
    {
        question: "Mikä on kuusikulmion sisäkulmien summa?",
        options: ["720°", "540°", "600°", "480°"],
        answer: "720°",
        image: "game2 kuvat/kuusikulma.png"

    }
];

let currentQuestionIndex = 0;
let score = 0;

window.onload = function() {
    showQuestion();
};

function showQuestion() {
    let q = questions[currentQuestionIndex];
    document.getElementById("question").innerText = q.question;

    let img = document.getElementById("question-image");
    img.src = q.image;


    let optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach(function(option) {
        let button = document.createElement("button");
        button.innerText = option;
        button.onclick = function() { checkAnswer(option); };
        optionsDiv.appendChild(button);
    });

    document.getElementById("feedback").innerText = "";
}

function checkAnswer(selectedOption) {
    let correctAnswer = questions[currentQuestionIndex].answer;

    if (selectedOption === correctAnswer) {
        score++;
        document.getElementById("feedback").innerText = "Oikein!";
    } else {
        document.getElementById("feedback").innerText = "Väärin!";
    }

    setTimeout(nextQuestion, 1500);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endGame();
    }
}

function endGame() {

    sessionStorage.setItem("game2-score", score);

    document.getElementById("question").innerText = "Peli Loppui!";
    document.getElementById("options").innerHTML = "";
    document.getElementById("feedback").innerText =
        "Sait " + score + " pistettä " + questions.length + " kysymyksestä.";
}
