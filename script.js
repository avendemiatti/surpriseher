const quizData = [
    // === EDIT QUIZ QUESTIONS BELOW ===
    {
        question: "Onde tudo começou?",
        a: "Foto do cachorro quando eu tava em Nova York",
        b: "Karaoke no Consulado",
        c: "Primeira vez que te vi na academia com o Igor",
        d: "Comprando uma coxinha de xuxu no Los Amigos",
        correct: "b" 
    },
    {
        question: "Musica mais impactante para nós?",
        a: "The Less I Know The Better - Tame Impala",
        b: "Something - Lasgo",
        c: "I'm a Terrible Singer - Dua Lipa",
        d: "Eu Canto Com Má Vontade - Lagum ",
        correct: "a"
    },
    {
        question: "Do que ou quem EU acho que voce gosta mais?",
        a: "Bolo da ex sogra",
        b: "Rafael Marinheiro - Descendente de Português",
        c: "Paçoca",
        d: "Fusca",
        correct: "c"
    },
    {
        question: "Qual combinação de amigos que a gente se divertiria mais juntos?",
        a: "Luana/Jéssica/Wesley",
        b: "Lorraine/Andreia(ex chefe)/Rafael",
        c: "Ana/Tania/André",
        d: "Thales/Daniel/Igor",
        correct: "c"
    },
    {
        question: "Se a gente pudesse escolher um evento para ir, qual voce acha que EU escolheria para nós?",
        a: "Dua Lipa",
        b: "Evento Emo que esqueci o nome",
        c: "Viagem para alguma ilha no caribe junto com a Andréia (ex chefe)",
        d: "The Town",
        correct: "d"
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

function loadQuiz() {
    deselectAnswers(); // This is key for unchecking options
    if(feedbackEl) { 
        feedbackEl.textContent = ''; 
        feedbackEl.className = 'feedback-message'; 
    }
    
    const currentQuizData = quizData[currentQuiz];
    // Ensure elements exist before setting innerText (good practice)
    if(questionEl) questionEl.innerText = currentQuizData.question;
    if(a_text) a_text.innerText = currentQuizData.a;
    if(b_text) b_text.innerText = currentQuizData.b;
    if(c_text) c_text.innerText = currentQuizData.c;
    if(d_text) d_text.innerText = currentQuizData.d;

    setFormEnabled(true); 
}

function deselectAnswers() {
    answerEls.forEach(answerEl => {
        answerEl.checked = false;
    });
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
    answerEls.forEach(answerEl => {
        answerEl.disabled = !isEnabled;
    });
    if(submitBtn) {
        submitBtn.disabled = !isEnabled; 
    }
}

if (submitBtn) {
    submitBtn.addEventListener('click', () => {
        const answer = getSelected();
        
        if (answer) {
            setFormEnabled(false); 

            if (answer === quizData[currentQuiz].correct) {
                score++;
                if(feedbackEl) {
                    feedbackEl.textContent = 'Correto! 🎉';
                    feedbackEl.className = 'feedback-message correct';
                }
            } else {
                if(feedbackEl) {
                    const correctAnswerText = quizData[currentQuiz][quizData[currentQuiz].correct]; // Get the text of the correct answer
                    feedbackEl.textContent = `Incorreto. A resposta certa era: "${correctAnswerText || 'N/A'}"`; // Display it
                    feedbackEl.className = 'feedback-message incorrect';
                }
            }

            currentQuiz++;

            setTimeout(() => {
                if (currentQuiz < quizData.length) {
                    loadQuiz();
                } else {
                    localStorage.setItem('quizScore', score);
                    localStorage.setItem('quizTotalQuestions', quizData.length);
                    
                    const quizAudioPlayer = document.getElementById('quizSongPlayer'); 
                    if (quizAudioPlayer) {
                        localStorage.setItem('songCurrentTime', quizAudioPlayer.currentTime);
                        localStorage.setItem('songIsPlaying', !quizAudioPlayer.paused); 
                    }
                    localStorage.setItem('playSongOnRevealLoad', 'true'); 
                    
                    window.location.href = 'reveal.html';
                }
            }, 2500); 

        } else {
            if(feedbackEl) {
                feedbackEl.textContent = "Por favor, selecione uma resposta!";
                feedbackEl.className = 'feedback-message incorrect';
            }
        }
    });
}

// --- THIS IS THE MAIN FIX AREA for initial load ---
document.addEventListener('DOMContentLoaded', () => {
    // Initial Quiz Load (if on quiz.html page which has the 'quiz' element)
    if (document.getElementById('quiz')) { 
        loadQuiz(); // <<<< THIS WILL NOW RUN and call deselectAnswers()
    }

    // Music logic for quiz.html (if quizSongPlayer exists on this page)
    const quizAudioPlayer = document.getElementById('quizSongPlayer');
    if (quizAudioPlayer && localStorage.getItem('playSongOnQuizLoad') === 'true') {
        quizAudioPlayer.play().then(() => {
            console.log("Quiz song started!");
        }).catch(error => {
            console.warn("Quiz song autoplay was prevented:", error);
        });
        localStorage.removeItem('playSongOnQuizLoad');
    }
});