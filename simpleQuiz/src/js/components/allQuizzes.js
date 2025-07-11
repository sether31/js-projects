import quizManager from '../logic/quizManager.js';
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter.js';

const manager = quizManager();

// test dummy
if(manager.getAllQuizzes().length === 0){
  // makeup
   manager.createQuiz(
    "Makeup Basics Quiz (TEST DUMMY)",
    5,
    [
      {
        question: "Which product is typically used to even out the skin tone?",
        choices: { a: "Mascara", b: "Foundation", c: "Lipstick", d: "Blush" },
        answer: "b"
      },
      {
        question: "What is used to make eyelashes look longer and darker?",
        choices: { a: "Eyeliner", b: "Concealer", c: "Mascara", d: "Highlighter" },
        answer: "c"
      },
      {
        question: "Which product adds color to the cheeks?",
        choices: { a: "Blush", b: "Brow Gel", c: "Primer", d: "Contour" },
        answer: "a"
      },
      {
        question: "What do you apply before foundation to help makeup last longer?",
        choices: { a: "Setting Spray", b: "Primer", c: "Powder", d: "Balm" },
        answer: "b"
      },
      {
        question: "What does the acronym 'GRWM' stand for in beauty content?",
        choices: {
          a: "Glow Really With Makeup",
          b: "Get Ready With Me",
          c: "Go Run With Mascara",
          d: "Glam Routine With Moisturizer"
        },
        answer: "b"
      }
    ]
  );

  // code
  manager.createQuiz(
    'Code basics (TEST DUMMY)',
    5,
    [
      {
        question: "What does WCAG stand for?",
        choices: {
          a: "Web Content Accessibility Guidelines",
          b: "Web Code and Accessibility Guide",
          c: "Wide Community Accessibility Guide",
          d: "Web Compatibility and Adaptability Guide"
        },
        answer: "a"
      },
      {
        question: "In WCAG, what is the purpose of providing sufficient color contrast?",
        choices: {
          a: "Make the site prettier",
          b: "Help people read text more easily",
          c: "Speed up loading time",
          d: "Reduce file size"
        },
        answer: "b"
      },
      {
        question: "Which WCAG principle focuses on making content understandable to users?",
        choices: {
          a: "Perceivable",
          b: "Operable",
          c: "Understandable",
          d: "Robust"
        },
        answer: "c"
      },
      {
        question: "What does 'async' mean in JavaScript?",
        choices: {
          a: "Run code faster by skipping it",
          b: "Pause execution forever",
          c: "Allow functions to run without blocking other code",
          d: "Convert code to HTML"
        },
        answer: "c"
      },
      {
        question: "What keyword is usually paired with 'async' to wait for a promise to resolve?",
        choices: {
          a: "then",
          b: "wait",
          c: "pause",
          d: "await"
        },
        answer: "d"
      }
    ]
  );
}

export const renderAllQuizzes = () => {
  const container = document.querySelector('#content');
  container.innerHTML = ''
  if (!container) return;

  const totalQuizzes = manager.getAllQuizzes();
  if(totalQuizzes.length === 0) {
    const text = document.createElement('p');
    text.textContent = "NO QUIZZES AVAILABLE"
    text.classList.add("mt-10", "text-lg" ,"italic", "font-bold", "text-center", "text-gray-400");
    container.appendChild(text);
  }
  // use fragment to repaint all at once instead per each item
  const fragment = document.createDocumentFragment();
  totalQuizzes.forEach((data) => fragment.appendChild(createCard(data)));
  container.appendChild(fragment);
}
  

export const createCard = (quiz) => {
  const card = document.createElement('div');
  card.classList.add("rounded-md", "shadow-lg", "relative");
  card.setAttribute('data-id', quiz.id);

  // delete quiz
  const deleteQuiz = document.createElement('button');
  deleteQuiz.textContent = "Delete";
  deleteQuiz.classList.add("absolute", "top-0", "right-0", "bg-pink-500", "max-content", "p-2", "text-white", "rounded-bl-md", "rounded-tr-md", "cursor-pointer", "hover:bg-pink-700", "duration-300");
  deleteQuiz.setAttribute('aria-label', "Delete Quiz");
  card.appendChild(deleteQuiz);

  deleteQuiz.onclick = () =>{
    const quizId = card.dataset.id;

    const result = confirm("Are you sure you want to delete this quiz?");
    if(result){
      manager.deleteQuiz(quizId);
      renderAllQuizzes();
    } 
  }

  // card img
  const img = document.createElement('img');
  img.src = "https://tse1.mm.bing.net/th?id=OIP.7JSN9trMauRbIA2Uiue-SwHaEK&pid=Api&P=0&h=220";
  img.classList.add("w-full", "rounded-t-md");
  img.alt = "Quiz time picture";

  // card body
  const cardBody = document.createElement('div');
  cardBody.classList.add("grid", "gap-2", "p-2");

  // card title
  const title = document.createElement('a');
  title.href = `./public/takeQuiz.html?id=${quiz.id}`;
  title.classList.add("mt-4" ,"text-base", "font-medium", "sm:text-lg", "hover:text-pink-500", "underline", "underline-offset-4", "hover:underline-pink-500", "duration-300");
  title.textContent = capitalizeFirstLetter(quiz.title);

  // card description
  const description = document.createElement('p');
  description.classList.add("mb-4", "text-base");
  description.textContent = `This quiz is 1 to ${quiz.size} long.`;

  // btn container
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('grid', 'gap-2', 'grid-cols-1', 'md:grid-cols-2');

  // card submit btn
  const submit = document.createElement('a');
  submit.href = `./public/takeQuiz.html?id=${quiz.id}`;
  submit.classList.add("btn", "btn-primary");
  submit.textContent = "Take Quiz";

  // card update
  const update = document.createElement('a');
  update.href = `./public/updateQuiz.html?id=${quiz.id}`;
  update.classList.add("btn", "btn-secondary");
  update.textContent = "Update Quiz";

  btnContainer.append(submit, update);
  cardBody.append(title, description, btnContainer);
  card.append(img, cardBody);
  
  return card;
}

renderAllQuizzes();