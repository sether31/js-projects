import quizManager from '../logic/quizManager.js';

const manager = quizManager();

const quiz = new URLSearchParams(window.location.search);
const getId = quiz.get("id");
const quizData = manager.findQuiz(getId);

export const generateQuiz = () => {
  const form = document.querySelector('#form');
  form.innerHTML = '';
  // create title
  const title = document.createElement('input');
  title.type = "text";
  title.name = "title";
  title.id = "title";
  title.placeholder = "Title"
  title.value = quizData.title;
  title.classList.add("border-2", "rounded-md", "w-full", "p-2", "sm:w-[80%]", "mx-auto", "border-gray-400", "focus:outline-pink-700");
  title.setAttribute('required', '');
  form.appendChild(title);

  for(let i = 1; i <= quizData.size; i++){
    const wrapper = document.createElement('div');
    wrapper.innerHTML = createQuestionBlock(i);
    form.appendChild(wrapper.firstElementChild);
  }

 form.appendChild(updateBtn());
 form.onsubmit = handleQuizSubmission;
}

export const createQuestionBlock = (index) => {
  const questionData = quizData.questions[index - 1];

  const question = 
  `
    <fieldset class="border-2 border-gray-400 p-4 rounded-md">
      <legend class="px-2 text-lg font-medium tracking-wider">Question ${index}</legend>

      <div class="grid gap-2">
        <label for="question-${index}">Question: </label>
        <input class="border-2 border-gray-400 py-[6px] px-2 rounded-md focus:outline-pink-700 w-full" type="text" name="question-${index}" id="question-${index}" value="${questionData.question}">
      </div>

      <div class="grid gap-2">
        <h2>Choices:</h2>

        ${createChoicesBlock(index, 'a', questionData.choices.a, questionData.answer)}
        ${createChoicesBlock(index, 'b', questionData.choices.b, questionData.answer)}
        ${createChoicesBlock(index, 'c', questionData.choices.c, questionData.answer)}
        ${createChoicesBlock(index, 'd', questionData.choices.d, questionData.answer)}
      </div>
    </fieldset>
  `;

  return question;
}

export const createChoicesBlock = (index, choice, value, correctAnswer) => {
  return `
    <div class="flex gap-2 items-center">
      <input class="accent-pink-700" type="radio" name="answer-${index}" value="${choice}" 
      ${(correctAnswer === choice) ? "checked" : ""}>

      <p>${choice.toUpperCase()}</p>

      <input class="border-2 border-gray-400 py-[6px] px-2 rounded-md focus:outline-pink-700 w-full" type="text" name="choice-${index}-${choice}" id="choice-${index}-${choice}" value="${value}">
    </div>
  `;
}

export const updateBtn = () => {
  const updateBtn = document.createElement('button');
  updateBtn.textContent = 'Update Quiz';
  updateBtn.type = 'submit';
  updateBtn.classList.add('btn', 'btn-primary');
  
  return updateBtn;
}

export const handleQuizSubmission = (e) => {
  e.preventDefault();

  const quizTitle = document.querySelector('#title').value;
  const questions = [];

  // to get the question and choices values
  for(let i = 1; i <= quizData.size; i++){
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
    const updated = manager.updateQuiz(quizData.id, {
      title: quizTitle,
      questions: questions
    });

    console.log("Quiz updated!", updated);
    alert("Quiz successfully updated!");
  } catch (err) {
    alert("Failed to update quiz: " + err.message);
  }

}

if(quizData){
  generateQuiz();
} else{
  alert("Cannot find quiz");
}
