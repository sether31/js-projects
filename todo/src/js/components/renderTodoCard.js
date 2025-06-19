import ellipsis from '../utilities/ellipsis.js';

function renderTodoCard(todo, index) {
  if(todo.status === false){
    return `
      <div class="task-card p-4 bg-gray-300 rounded-md">
        <div class="flex justify-between">
          <h1 class="title text-lg text-white font-medium tracking-wide py-2">
            ${ellipsis(todo.title, 20)}
          </h1>

          <div class="flex gap-2">
            <button class="view-btn btn btn-slate" id="openTask-${index}" type="button">
              View
            </button>

            <button class="update-btn btn btn-green" type="button" data-index="${index}">
              Update
            </button>
            
            <button class="delete-btn btn btn-danger" type="button" data-index="${index}">Delete</button>
          </div>
        </div>

        <div class="hidden" id="content-${index}">
          <p class="text-lg text-white pt-4">${todo.title}</p>
          <p class="min-w-full text-white text-base pt-4">
            + ${todo.description}
          </p>

          <button type="button" class="complete-btn mt-8 ml-auto block btn btn-green" data-index="${index}">Complete</button>
        </div>
      </div>
    `;
  }
}

export default renderTodoCard;