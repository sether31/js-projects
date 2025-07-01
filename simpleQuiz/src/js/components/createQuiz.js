import quizManager from '../logic/quizManager.js';

const manager = quizManager();

export const generateQuiz = () => {
  const form = document.querySelector('#form');
  form.innerHTML = '';
  // create title
  const title = document.createElement('input');
  title.type = "text";
  title.name = "title";
  title.id = "title";
  title.placeholder = "Title"
  title.className = "border-2 rounded-md w-full p-2 sm:w-[80%] mx-auto border-gray-400";
  title.setAttribute('required', '');
  form.appendChild(title);

  const numQuestions = Number(document.querySelector('#numberQuiz').value);

  for(let i = 1; i <= numQuestions; i++){
    const wrapper = document.createElement('div');
    wrapper.innerHTML = createQuestionBlock(i);
    form.appendChild(wrapper.firstElementChild);
  }

 form.appendChild(submitBtn());
 form.onsubmit = handleQuizSubmission;
}

export const createQuestionBlock = (index) => {
  const question = 
  `
    <fieldset class="border-2 border-gray-400 p-4 rounded-md">
      <legend class="px-2 text-lg font-medium tracking-wider">Question ${index}</legend>

      <div class="grid gap-2">
        <label for="question-${index}">Question: </label>
        <input class="border-2 border-gray-400 py-[6px] px-2 rounded-md focus:outline-pink-700 w-full" type="text" name="question-${index}" id="question-${index}">
      </div>

      <div class="grid gap-2">
        <h2>Choices:</h2>

        ${createChoicesBlock(index, 'a')}
        ${createChoicesBlock(index, 'b')}
        ${createChoicesBlock(index, 'c')}
        ${createChoicesBlock(index, 'd')}
      </div>
    </fieldset>
  `;

  return question;
}

export const createChoicesBlock = (index, choice) => {
  return `
    <div class="flex gap-2 items-center">
      <input type="radio" name="answer-${index}" value="${choice}">

      <p>${choice.toUpperCase()}</p>

      <input class="border-2 border-gray-400 py-[6px] px-2 rounded-md focus:outline-pink-700 w-full" type="text" name="choice-${index}-${choice}" id="choice-${index}-${choice}">
    </div>
  `;
}

export const submitBtn = () => {
  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit Quiz';
  submitBtn.type = 'submit';
  submitBtn.classList.add('btn', 'btn-primary');
  
  return submitBtn;
}

export const handleQuizSubmission = (e) => {
  e.preventDefault();

  const numQuestions = Number(document.querySelector('#numberQuiz').value);
  const quizTitle = document.querySelector('#title').value;
  const questions = [];

  // to get the question and choices values
  for(let i = 1; i <= numQuestions; i++){
    const questionText = document.querySelector(`#question-${i}`).value;
    const choices = {
      a: document.querySelector(`#choice-${i}-a`).value,
      b: document.querySelector(`#choice-${i}-b`).value,
      c: document.querySelector(`#choice-${i}-c`).value,
      d: document.querySelector(`#choice-${i}-d`).value
    };

    const isSelectAnswer = document.querySelector(`input[name="answer-${i}"]:checked`);

    if(!isSelectAnswer){
      alert(`Please select choice for number ${i}`);
      return;
    }

    const correctAnswer = isSelectAnswer.value;

    questions.push({
      question: questionText,
      choices: choices,
      answer: correctAnswer
    });
  }

  try {
    const quiz = manager.createQuiz(quizTitle, numQuestions, questions);
    console.log("Quiz created!", quiz);
    alert("Quiz successfully created!");
    document.querySelector('#form').reset();
    document.querySelector('#form').innerHTML = '';
  } catch (err) {
    alert("Failed to create quiz: " + err.message);
  }
}

document.querySelector('#ask').onsubmit = (e) =>{
  e.preventDefault();
  generateQuiz();
}
