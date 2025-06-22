import createTodoList from "./class/todo.js";

// modal
const addTaskBtn = document.querySelector('#add-task');
const addTaskModal = document.querySelector('#add-task-modal');
const closeAddModal = document.querySelector('#close-add-modal');

// tabs
const activeContainer = document.querySelector('#active-container');
const completedContainer = document.querySelector('#completed-container');

addTaskBtn.addEventListener('click', ()=>{
  addTaskModal.classList.remove('hidden');
});

closeAddModal.addEventListener('click', ()=>{
  addTaskModal.classList.add('hidden');
});

// create todo
const myTodo = createTodoList();
myTodo.addTask("learn web development", "html, css, js, git, tailwindcss, jest");
myTodo.renderTodo();

// add task
document.querySelector('#add-task-form').addEventListener('submit', (e)=>{
  e.preventDefault();
  let title = document.querySelector('#add-title');
  let description = document.querySelector('#add-description');

  if(title && description){
    myTodo.addTask(title.value.trim(), description.value.trim());
    title.value = '';
    description.value = '';
    alert('Add successful')
    myTodo.renderTodo();
  }
});


document.querySelector('#task-container').addEventListener('click', (e) => {
  // update task
  if(e.target.classList.contains('update-btn')){
    const i = parseInt(e.target.dataset.index);
    const currentTask = myTodo.getData(i);
    const newTitle = prompt('New title', currentTask.title);
    const newDesc = prompt('New description', currentTask.description);

    if (newTitle && newDesc) {
      myTodo.updateTask(i, newTitle.trim(), newDesc.trim());
      myTodo.renderTodo();
    }
  }

  // delete task
  if(e.target.classList.contains('delete-btn')){
    const i = parseInt(e.target.dataset.index);
    myTodo.deleteTask(i);
    myTodo.renderTodo();
  }

  // complete task
  if(e.target.classList.contains('complete-btn')){
    const i = parseInt(e.target.dataset.index);
    myTodo.completeTodo(i);
    alert("Completed!");
    myTodo.renderTodo();
  }
});

// search task
document.querySelector("#search-input").addEventListener('input', function(){
  const query = this.value.toLowerCase();

  document.querySelectorAll('.task-card').forEach((card)=>{
    const title = card.querySelector('.title').textContent.toLowerCase();

    if(title.includes(query)){
      card.style.display = "block";
    } else{
      card.style.display = "none";
    }
  })
});

// tab
document.querySelector('#tab-completed').addEventListener('click', function(){
  activeContainer.classList.add('hidden');
  document.querySelector('#tab-active').classList.remove('active-tab');

  completedContainer.classList.remove('hidden');
  this.classList.add('active-tab');
  myTodo.renderCompleteTodo();
});

document.querySelector('#tab-active').addEventListener('click', function(){
  completedContainer.classList.add('hidden');
  document.querySelector('#tab-completed').classList.remove('active-tab');

  activeContainer.classList.remove('hidden');
  this.classList.add('active-tab');
  myTodo.renderTodo();
});


