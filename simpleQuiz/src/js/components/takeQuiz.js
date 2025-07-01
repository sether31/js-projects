import quizManager from '../logic/quizManager.js';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter.js';

const manager = quizManager();

const getId = new URLSearchParams(window.location.search);
const quizId = getId.get('id');
const quiz = manager.findQuiz(quizId);

const form = document.querySelector('#form');

if(quiz) {
  renderTakeQuiz();
} else{
  alert('Error')
}

const quizTitle = document.querySelector('#title');
quizTitle.textContent = quiz.title;

function renderTakeQuiz() {
  quiz.questions.forEach((data, index) => {
    // question text
    const question = document.createElement('h2');
    question.classList.add('mb-2', 'font-medium');
    question.textContent = `${index + 1}. ${capitalizeFirstLetter(data.question)}`;

    const choicesContainer = document.createElement('div');
    choicesContainer.classList.add('flex', 'flex-col', 'gap-2', 'mb-4');

    
    Object.entries(data.choices).forEach(([letter, text]) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('ml-2', 'flex', 'gap-2', 'items-center');

      const radio = document.createElement('input');
      radio.type = "radio";
      radio.name = `choices-${index}`;
      radio.value = letter;
      radio.classList.add('accent-pink-700');
      radio.id = `choices-${index}-${letter}`;
      radio.setAttribute('required', '');

      const label = document.createElement('label');
      label.setAttribute('for', `choices-${index}-${letter}`);
      label.textContent = `${letter.toUpperCase()}. ${text}`;

      wrapper.append(radio, label);
      choicesContainer.appendChild(wrapper);
    });

    form.appendChild(question);
    form.appendChild(choicesContainer);
  });
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit Quiz';
  submitBtn.type = 'submit';
  submitBtn.classList.add('btn', 'btn-primary');
  form.appendChild(submitBtn)
}

form.onsubmit = (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const userAnswers = quiz.questions.map((_, index) => formData.get(`choices-${index}`));
  const correctAnswers = quiz.questions.map(x => x.answer);

  let score = 0;
  userAnswers.forEach((answer, index) => {
    if(answer === correctAnswers[index]){
      score++
    }
  });
  alert(`You scored ${score} out of ${quiz.questions.length}`);
  form.innerHTML = '';
  renderTakeQuiz()
};


