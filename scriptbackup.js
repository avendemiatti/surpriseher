// const quizData = [
//     // === EDIT QUIZ QUESTIONS BELOW ===
//     // IMPORTANT: The 'correct' property should be the 'id' of the correct radio button (a, b, c, or d)
//     {
//         question: "Onde tudo começou?",
//         a: "Foto do cachorro quando eu tava em Nova York",
//         b: "Karaoke no Consulado",
//         c: "Primeira vez que te vi na academia com o Igor",
//         d: "Comprando uma coxinha de xuxu no Los Amigos",
//         correct: "b" 
//     },
//     {
//         question: "Musica mais impactante para nós?",
//         a: "The Less I Know The Better - Tame Impala",
//         b: "Something - Lasgo",
//         c: "I'm a Terrible Singer - Dua Lipa",
//         d: "Eu Canto Com Má Vontade - Lagum ",
//         correct: "a"
//     },
//     {
//         question: "Do que ou quem EU acho que voce gosta mais?",
//         a: "Bolo da ex sogra",
//         b: "Rafael Marinheiro - Descedente de Portugues",
//         c: "Paçoca",
//         d: "Fusca",
//         correct: "c"
//     },
//     {
//         question: "Qual combinação de amigos que a gente se divertiria mais juntos?",
//         a: "Luana/Jéssica/Wesley",
//         b: "Lorraine/Andreia(ex chefe)/Rafael",
//         c: "Ana/Tania/André",
//         d: "Thales/Daniel/Igor",
//         correct: "b"
//     },
//     {
//         question: "Se a gente pudesse escolher um evento para ir, qual voce acha que EU escolheria para nós?",
//         a: "Dua Lipa",
//         b: "Evento Emo que esqueci o nome",
//         c: "Viagem para alguma ilha no caribe junto com a Andréia (ex chefe)",
//         d: "The Town",
//         correct: "d"
//     }
//     // === END OF QUIZ QUESTIONS ===
// ];

// const quiz = document.getElementById('quiz');
// const answerEls = document.querySelectorAll('.answer');
// const questionEl = document.getElementById('question');
// const a_text = document.getElementById('a_text');
// const b_text = document.getElementById('b_text');
// const c_text = document.getElementById('c_text');
// const d_text = document.getElementById('d_text');
// const submitBtn = document.getElementById('submit');
// const feedbackEl = document.getElementById('feedback');

// let currentQuiz = 0;
// let score = 0;

// loadQuiz();

// function loadQuiz() {
//     deselectAnswers();
//     feedbackEl.textContent = ''; // Clear previous feedback
//     feedbackEl.className = 'feedback-message'; // Reset class
    
//     const currentQuizData = quizData[currentQuiz];
//     questionEl.innerText = currentQuizData.question;
//     a_text.innerText = currentQuizData.a;
//     b_text.innerText = currentQuizData.b;
//     c_text.innerText = currentQuizData.c;
//     d_text.innerText = currentQuizData.d;

//     setFormEnabled(true); // Enable form elements for the new question
// }

// function deselectAnswers() {
//     answerEls.forEach(answerEl => answerEl.checked = false);
// }

// function getSelected() {
//     let answer;
//     answerEls.forEach(answerEl => {
//         if (answerEl.checked) {
//             answer = answerEl.id;
//         }
//     });
//     return answer;
// }

// function setFormEnabled(isEnabled) {
//     answerEls.forEach(answerEl => answerEl.disabled = !isEnabled);
//     submitBtn.disabled = !isEnabled;
// }

// submitBtn.addEventListener('click', () => {
//     const answer = getSelected();
    
//     if (answer) {
//         setFormEnabled(false); // Disable form while showing feedback

//         if (answer === quizData[currentQuiz].correct) {
//             score++;
//             feedbackEl.textContent = 'Correto! 🎉';
//             feedbackEl.className = 'feedback-message correct';
//         } else {
//             feedbackEl.textContent = `Incorreto. A resposta certa era: ${quizData[currentQuiz][quizData[currentQuiz].correct]}`;
//             // Or simply: feedbackEl.textContent = 'Incorreto. 😟';
//             feedbackEl.className = 'feedback-message incorrect';
//         }

//         currentQuiz++;

//         setTimeout(() => {
//             if (currentQuiz < quizData.length) {
//                 loadQuiz();
//             } else {
//                 localStorage.setItem('quizScore', score);
//                 localStorage.setItem('quizTotalQuestions', quizData.length);
//                 window.location.href = 'reveal.html';
//             }
//         }, 2500); // Show feedback for 2.5 seconds

//     } else {
//         feedbackEl.textContent = "Por favor, selecione uma resposta!";
//         feedbackEl.className = 'feedback-message incorrect'; // Use incorrect style for prompt
//         // Or use a simple alert: alert("Por favor, selecione uma resposta antes de continuar!");
//     }
// });
