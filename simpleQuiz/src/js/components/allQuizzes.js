import quizManager from '../logic/quizManager.js';

const manager = quizManager();
export const renderAllQuizzes = () => {
  const container = document.querySelector('#content');
  if (!container) return;

  const totalQuizzes = manager.getAllQuizzes();
  if(totalQuizzes.length === 0) {
    const text = document.createElement('p');
    text.textContent = "NO QUIZZES AVAILABLE"
    text.className = "mt-10 text-lg italic font-bold text-center text-gray-400";
    container.appendChild(text);
  }
  // use fragment to repaint all at once instead per each item
  const fragment = document.createDocumentFragment();
  totalQuizzes.forEach((data) => fragment.appendChild(createCard(data)));
  container.appendChild(fragment);
}
  

export const createCard = (quiz) => {
  const card = document.createElement('div');
  card.className = "rounded-md shadow-lg";
  card.setAttribute('data-id', quiz.id);

  // card img
  const img = document.createElement('img');
  img.src = "https://tse1.mm.bing.net/th?id=OIP.7JSN9trMauRbIA2Uiue-SwHaEK&pid=Api&P=0&h=220";
  img.className = "w-full rounded-t-md";
  img.alt = "Quiz time picture";

  // card body
  const cardBody = document.createElement('div');
  cardBody.className = "grid gap-2 p-2";

  // card title
  const title = document.createElement('h2');
  title.className = "mt-4 text-base font-medium sm:text-lg";
  title.textContent = quiz.title;

  // card description
  const description = document.createElement('p');
  description.className = "mb-4 text-base";
  description.textContent = `This quiz is 1-${quiz.size} long.`;

  // card btn
  const btn = document.createElement('a');
  btn.href = `./takeQuiz.html?id=${quiz.id}`;
  btn.className = "btn btn-primary"
  btn.textContent = "Take Quiz"

  cardBody.append(title, description, btn);
  card.append(img, cardBody);
  
  return card;
}

renderAllQuizzes()