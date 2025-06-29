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
});

describe('Generating quiz', () => {
  let manager;

  beforeEach(() => {
    localStorage.clear(); // clean storage before each test
    manager = quizManager(); // fresh manager instance
  });

  test('Create quiz', () => {
    const quiz = manager.createQuiz(
      'title', 1, [{ question: '1+1?', choices: { a: 1, b: 2, c: 3, d: 4}, answer: 'b' }]
    );

    expect(quiz.title).toBe('title');
    expect(quiz.questions).toHaveLength(1);
    expect(quiz.questions[0].question).toBe('1+1?');
  });

  test('Create multiple quizzes', () => {
    manager.createQuiz(
      'Quiz 1', 1, [{ question: '1+1?', choices: { a: 1, b: 2, c: 3, d: 4}, answer: 'b' }]
    );
    manager.createQuiz(
      'Quiz 2', 1, [{ question: '3+3?', choices: { a: 2, b: 4, c: 6, d: 8}, answer: 'c' }]
    );

    const quizzes = manager.getAllQuizzes();

    expect(quizzes).toHaveLength(2);
    expect(quizzes[1].title).toBe('Quiz 2');
  });
});
