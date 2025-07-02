import quizManager from '../logic/quizManager.js';

const manager = quizManager();
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
  const title = document.createElement('h2');
  title.classList.add("mt-4" ,"text-base", "font-medium", "sm:text-lg");
  title.textContent = quiz.title;

  // card description
  const description = document.createElement('p');
  description.classList.add("mb-4", "text-base");
  description.textContent = `This quiz is 1-${quiz.size} long.`;

  // btn container
  const btnContainer = document.createElement('div');
  btnContainer.classList.add('grid', 'gap-2', 'grid-cols-1', 'md:grid-cols-2');

  // card submit btn
  const submit = document.createElement('a');
  submit.href = `./takeQuiz.html?id=${quiz.id}`;
  submit.classList.add("btn", "btn-primary");
  submit.textContent = "Take Quiz";

  // card update
  const update = document.createElement('a');
  update.href = `./updateQuiz.html?id=${quiz.id}`;
  update.classList.add("btn", "btn-secondary");
  update.textContent = "Update Quiz";

  btnContainer.append(submit, update);
  cardBody.append(title, description, btnContainer);
  card.append(img, cardBody);
  
  return card;
}

renderAllQuizzes();