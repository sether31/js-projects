const quizManager = function(){
  const STORAGE_KEY = 'quizzes';

  const load = () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  };

  const save = (quizzes) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizzes));
  };

  return {
    createQuiz(title, size, questions) {
      const quizzes = load();

      if(!title || questions.length === 0){
        throw new Error("Invalid quiz data");
      }

      const quiz = {
        id: crypto.randomUUID(),
        title: title.trim(),
        size, 
        questions
      }

      quizzes.push(quiz);
      save(quizzes);
      return quiz;
    },
    getAllQuizzes() {
      return load();
    },
    findQuiz(quizId) {
      const quizzes = load();
      return quizzes.find(x => x.id === quizId) || null;
    }
    ,
    clearAll() {
      localStorage.removeItem(STORAGE_KEY);
    },
    deleteQuiz(id){
      const data = load();
      const index = data.findIndex(quiz => quiz.id === id);

      if(index !== -1){
        const [deleted] = data.splice(index, 1);
        alert(`Deleted quiz: ${deleted.title}`);
        save(data);
        return true;
      }

      alert("Quiz not found.");
      return false;
    },
    updateQuiz(id, newData){
      const data = load();
      const index = data.findIndex(quiz => quiz.id === id);

      if(index !== -1){
        data[index] = {
          ...data[index],
          title: newData.title.trim() || data[index].title,
          questions: Array.isArray(newData.questions) ? newData.questions : data[index].questions
        }

        save(data);
        return true;
      }
      alert("Quiz not found.");
      return false;
    }
  }
}

export default quizManager;