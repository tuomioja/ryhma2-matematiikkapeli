const playButton = document.getElementById('play-button')
playButton.addEventListener('click', startGame);

//Function to make fractions show correctly
function fractionMaker5000(str) {
    if (typeof str !== 'string') return str; // Jos ei string, näytä sellaisenaan
    if (!str.includes('/')) return str;      // Näytä sellaisenaan, jos ei murtoa

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
            question: "Paljonko 10% on luvusta 100?", answers: [10, 20, 30, 40], correct: 10, difficulty: 1 
        },
        {
            question: "Monta prosenttia 1 on luvusta 10?", answers: [5, 20, 25, 10], correct: 10, difficulty: 1
        },
        {
            question: "Millä laskutoimituksella saadaan montako prosenttia luku 15 on luvusta 50?", answers: ['15/50', '50/15', '0,15 × 50' ], correct: '15/50', difficulty: 2
        },
        {
            question: 'Jos 150€ maksava tuote on 20% alennuksessa, miten lasketaan alennuksen määrä?', answers: ['150/100 × 20', '100/150 × 20', '150 / 0,20'], correct: '150/100 * 20', difficulty: 3
        }
    ]
    questions.sort((a, b) => a.difficulty - b.difficulty);

    let questionNumber = 0;
    let currentScore = 0;
    const endingNumber = 4;
    
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
                    answerContent.innerHTML = '';
                    if (currentScore == 10) {
                        questionContent.textContent = "Mahtavaa! Sait kaikki oikein!";
                    } else if (currentScore >=7) {
                        questionContent.textContent = "Loistavaa! Sait lähes kaikki oikein! Voit jatkaa harjoittelua saadaksesi täydet pisteet! tai siirtyä seuraavaan peliin";
                    } else if (currentScore >=4) {
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