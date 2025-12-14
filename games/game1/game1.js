const playButton = document.getElementById('play-button')
playButton.addEventListener('click', startGame);

//Function to make fractions show correctly
function fractionMaker5000(str) {
    if (typeof str !== 'string') return str;
    if (!str.includes('/')) return str;

    const [top, bottom] = str.split('/').map(s => s.trim());
    return `<span class="fraction">
                <span class="numerator">${top}</span>
                <span class="denominator">${bottom}</span>
            </span>`;
}

// Function startGame includes basic game logic and questions 
function startGame() {
    document.getElementById('play-button').style.display = 'none';
    document.getElementById('game-content').style.display = 'block';

    const score = document.getElementById('score');
    const answerContent = document.getElementById('answers');
    const questionContent = document.getElementById('question');
    const answerFeedback = document.getElementById('answerFeedback');

    answerFeedback.textContent = "";

    const questions = [

        {

            question: "Paljonko 10% on luvusta 50?",
            answers: [5, 10, 15, 20],
            correct: 5,
            difficulty: 1
        },
        {
            question: "Paljonko 50% on luvusta 40?",
            answers: [10, 20, 30, 40],
            correct: 20,
            difficulty: 1
        },
        {
            question: "Paljonko 25% on luvusta 80?",
            answers: [10, 20, 30, 40],
            correct: 20,
            difficulty: 1
        },
        {
            question: "Monta prosenttia 10 on luvusta 100?",
            answers: [5, 10, 20, 25],
            correct: 10,
            difficulty: 1
        },
        {
            question: "Monta prosenttia 5 on luvusta 50?",
            answers: [5, 10, 15, 20],
            correct: 10,
            difficulty: 1
        },
        {
            question: "Paljonko 20% on luvusta 70?",
            answers: [14, 10, 20, 7],
            correct: 14,
            difficulty: 2
        },
        {
            question: "Paljonko 30% on luvusta 90?",
            answers: [27, 30, 20, 9],
            correct: 27,
            difficulty: 2
        },
        {
            question: "Monta prosenttia 18 on luvusta 60?",
            answers: [20, 25, 30, 40],
            correct: 30,
            difficulty: 2
        },
        {
            question: "Monta prosenttia 12 on luvusta 48?",
            answers: [20, 25, 30, 40],
            correct: 25,
            difficulty: 2
        },
        {
            question: "Tuotteen hinta on 100€. Siitä saa 30% alennuksen. Kuinka monta euroa alennus on?",
            answers: [10, 20, 30, 40],
            correct: 30,
            difficulty: 2
        },
        {
            question: "Tuote maksaa 200€. Siitä saa 10% alennuksen. Mikä on uusi hinta?",
            answers: [180, 190, 170, 160],
            correct: 180,
            difficulty: 3
        },
        {
            question: "Hinta nousee 50 eurosta 60 euroon. Kuinka monta prosenttia hinta nousee?",
            answers: [10, 15, 20, 25],
            correct: 20,
            difficulty: 3
        },
        {
            question: "Kokeessa on 20 tehtävää. Oppilas saa 15 oikein. Kuinka monta prosenttia on oikein?",
            answers: [60, 65, 70, 75],
            correct: 75,
            difficulty: 3
        },
        {
            question: "Luokassa on 25 oppilasta. 5 on poissa. Kuinka monta prosenttia on poissa?",
            answers: [10, 15, 20, 25],
            correct: 20,
            difficulty: 3
        },
        {
            question: "Kaupassa 120€ maksava takki on 25€ alennuksessa. Kuinka monta prosenttia alennus on?",
            answers: [20, 25, 30, 40],
            correct: 20,
            difficulty: 3
        },

    ]
    questions.sort((a, b) => a.difficulty - b.difficulty);

    let questionNumber = 0;
    let currentScore = 0;
    const endingNumber = 15;
    
    // Function getQuestion shows questions and checks answers
    function getQuestion() {
        const currentQuestion = questions[questionNumber];

        answerFeedback.textContent = "";
        questionContent.textContent = currentQuestion.question;
        answerContent.innerHTML = '';
        score.textContent = "";

        currentQuestion.answers.forEach(answer => {
            const answerButton = document.createElement('button');
            answerButton.innerHTML = fractionMaker5000(answer);
            

            answerButton.addEventListener('click', () => {
                if (answer === currentQuestion.correct) {
                    currentScore++;
                } else {
                    answerFeedback.textContent = "";
                }
                
                questionNumber ++;
                
                if (questionNumber >= endingNumber) {

                    sessionStorage.setItem('game1-score', currentScore);

                    answerContent.innerHTML = '';
                    if (currentScore == 15) {
                        questionContent.textContent = "Mahtavaa! Sait kaikki oikein!";
                    } else if (currentScore >=10) {
                        questionContent.textContent = "Loistavaa! Sait lähes kaikki oikein! Voit jatkaa harjoittelua saadaksesi täydet pisteet! tai siirtyä seuraavaan peliin";
                    } else if (currentScore >=7) {
                        questionContent.textContent = "Hyvä yritys! Sait osan oikein, mutta voit parantaa tulostasi jatkamalla harjoittelua.";
                    } else{
                        questionContent.textContent = "Vielä jäi parannettavaa, mutta älä lannistu!";
                    }
                    score.textContent = `Pisteesi: ${'🔥'.repeat(currentScore)}`;
                    if (currentScore == 0) {
                        score.textContent = `Pistetilisi jäi avaamatta. Yritä uudelleen!`;
                    }
                    playButton.textContent = "Pelaa uudestaan";
                    playButton.style.display = 'block';
                    return;
                } else {
                    getQuestion();
                }
            });

            answerContent.appendChild(answerButton);
        });
    };
    getQuestion();
}