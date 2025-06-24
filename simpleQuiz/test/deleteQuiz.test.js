import quizManager from "../src/js/logic/quizManager.js";

beforeAll(() => {
  global.localStorage = {
    store: {},
    getItem(key) {
      return this.store[key] || null;
    },
    setItem(key, value) {
      this.store[key] = value;
    },
    removeItem(key) {
      delete this.store[key];
    },
    clear() {
      this.store = {};
    }
  };

  global.alert = jest.fn();
});

describe("Delete quiz from quizzes", ()=>{
  let manager;

  beforeEach(()=>{
    localStorage.clear();
    manager = quizManager();
  });

  test('Delete quiz', ()=>{
    const quiz = manager.createQuiz(
      'Quiz 1', 1, [{ question: '1+1?', choices: { a: 1, b: 2, c: 3, d: 4}, answer: 'b' }]
    );

    expect(manager.getAllQuizzes()).toHaveLength(1);
    const deleted = manager.deleteQuiz(quiz.id);
    expect(deleted).toBe(true);
    expect(manager.getAllQuizzes()).toHaveLength(0);
  });
});