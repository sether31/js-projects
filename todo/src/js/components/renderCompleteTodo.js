import ellipsis from '../utilities/ellipsis.js';

function renderCompleteTodo(todo, index) {
  if(todo.status === true){
    return `
      <div class="task-card p-4 bg-gray-300 rounded-md">
        <div class="flex justify-between">
          <h1 class="title text-lg text-white font-medium tracking-wide py-2">
            ${ellipsis(todo.title, 20)}
          </h1>

          <button class="p-2 bg-slate-500 text-white text-base rounded-md hover:bg-slate-400 duration-300 ease-in-out" id="openTask-${index}" type="button">
            View
          </button>
        </div>

        <div class="hidden" id="content-${index}">
          <p class="text-lg text-white pt-4">${todo.title}</p>
          <p class="min-w-full text-white text-base pt-4">
            + ${todo.description}
          </p>
        </div>
      </div>
    `;
  }
}

export default renderCompleteTodo;