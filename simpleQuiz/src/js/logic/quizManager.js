export const quizManager = function(){
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
      return this.getAllQuizzes();
    },
    getAllQuizzes() {
      return load();
    },
    clearAll() {
      localStorage.removeItem(STORAGE_KEY);
    }

  }
}