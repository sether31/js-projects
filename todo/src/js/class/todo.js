import renderTodoCard from '../components/renderTodoCard.js';
import renderCompleteTodo from '../components/renderCompleteTodo.js'
import capitalizeFirstLetter from '../utilities/capitalizeFirstLetter.js';

function createTodoList(){
  let data = [];

  return {
    addTask(title, description){
      data.push({
        title: capitalizeFirstLetter(title), 
        description: capitalizeFirstLetter(description), 
        status: false
      });
    },
    updateTask(index, title, description){
      if(data[index]){
        data[index].title = capitalizeFirstLetter(title);
        data[index].description = capitalizeFirstLetter(description);
      }
    },
    deleteTask(index){
      if(data[index]){
        data.splice(index, 1)
      }
    },
    renderTodo(){
      const container = document.querySelector('#task-container');
      const filtered = data.filter(x => x.status === false);

      if(filtered.length > 0){
        container.innerHTML = data.map(renderTodoCard).join('');

        data.forEach((_, index) => {
          const btn = document.querySelector(`#openTask-${index}`);
          const content = document.querySelector(`#content-${index}`);

          if (btn && content) {
            btn.addEventListener('click', () => {
              content.classList.toggle('hidden');
            });
          }
        });
      } else{
        container.innerHTML = "<p class='text-center mt-3 italic text-lg text-gray-400 '>NO TASK TODO</p>"
      }
    },
    renderCompleteTodo(){
      const container = document.querySelector('#complete-container');

      const filtered = data.filter(x => x.status === true);

      if(filtered.length > 0){
        container.innerHTML = filtered.map(renderCompleteTodo).join('');

        data.forEach((_, index) => {
          const btn = document.querySelector(`#openTask-${index}`);
          const content = document.querySelector(`#content-${index}`);

          if (btn && content) {
            btn.addEventListener('click', () => {
              content.classList.toggle('hidden');
            });
          }
        });
      } else{
        container.innerHTML = "<p class='text-center mt-3 italic text-lg text-gray-400 '>NO FINISH TASK</p>"
      }

      
    },
    getData(index){
      return data[index];
    },
    completeTodo(index){
      if(data[index]){
        data[index].status = true;
      }
    }
  }
}

export default createTodoList;