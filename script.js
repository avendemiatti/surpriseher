const quizData = [
    // === EDIT QUIZ QUESTIONS BELOW ===
    // IMPORTANT: The 'correct' property should be the 'id' of the correct radio button (a, b, c, or d)
    {
        question: "Qual foi o lugar do nosso primeiro encontro inesquecível?",
        a: "No cinema vendo aquele filme...",
        b: "Naquele café charmoso",
        c: "No parque, lembra?",
        d: "Na festa de um amigo",
        correct: "b" 
    },
    {
        question: "Qual é a minha mania que você acha mais engraçada (ou irritante, hehe)?",
        a: "Cantarolar o tempo todo",
        b: "Deixar a toalha molhada na cama",
        c: "Falar com as mãos",
        d: "Contar piadas ruins",
        correct: "a"
    },
    {
        question: "Qual a cor que você acha que mais combina comigo?",
        a: "Azul sereno",
        b: "Vermelho paixão",
        c: "Verde esperança",
        d: "Amarelo alegria",
        correct: "c"
    },
    {
        question: "Se fôssemos um casal de filme, qual seríamos?",
        a: "Jack e Rose (Titanic)",
        b: "Han Solo e Leia (Star Wars)",
        c: "Shrek e Fiona (Shrek)",
        d: "Allie e Noah (Diário de uma Paixão)",
        correct: "d"
    },
    {
        question: "O que você mais ama fazer quando estamos juntos?",
        a: "Maratonar séries e filmes",
        b: "Cozinhar algo delicioso",
        c: "Conversar por horas a fio",
        d: "Sair para explorar lugares novos",
        correct: "c"
    }
    // === END OF QUIZ QUESTIONS ===
];

const quiz = document.getElementById('quiz');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const feedbackEl = document.getElementById('feedback');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    deselectAnswers();
    feedbackEl.textContent = ''; // Clear previous feedback
    feedbackEl.className = 'feedback-message'; // Reset class
    
    const currentQuizData = quizData[currentQuiz];
    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;

    setFormEnabled(true); // Enable form elements for the new question
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
    let answer;
    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });
    return answer;
}

function setFormEnabled(isEnabled) {
    answerEls.forEach(answerEl => answerEl.disabled = !isEnabled);
    submitBtn.disabled = !isEnabled;
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    
    if (answer) {
        setFormEnabled(false); // Disable form while showing feedback

        if (answer === quizData[currentQuiz].correct) {
            score++;
            feedbackEl.textContent = 'Correto! 🎉';
            feedbackEl.className = 'feedback-message correct';
        } else {
            feedbackEl.textContent = `Incorreto. A resposta certa era: ${quizData[currentQuiz][quizData[currentQuiz].correct]}`;
            // Or simply: feedbackEl.textContent = 'Incorreto. 😟';
            feedbackEl.className = 'feedback-message incorrect';
        }

        currentQuiz++;

        setTimeout(() => {
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                localStorage.setItem('quizScore', score);
                localStorage.setItem('quizTotalQuestions', quizData.length);
                window.location.href = 'reveal.html';
            }
        }, 2500); // Show feedback for 2.5 seconds

    } else {
        feedbackEl.textContent = "Por favor, selecione uma resposta!";
        feedbackEl.className = 'feedback-message incorrect'; // Use incorrect style for prompt
        // Or use a simple alert: alert("Por favor, selecione uma resposta antes de continuar!");
    }
});