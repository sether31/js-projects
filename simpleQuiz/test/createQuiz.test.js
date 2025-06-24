import { quizManager } from "../src/js/logic/quizManager.js";

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
    const quiz = manager.createQuiz('title', 1, [
      { question: '2+2', choices: [1, 2, 3, 4], answer: 4 }
    ]);

    expect(quiz.title).toBe('title');
    expect(quiz.questions).toHaveLength(1);
    expect(quiz.questions[0].question).toBe('2+2');
  });

  test('Create multiple quizzes', () => {
    manager.createQuiz('Quiz 1', 1, [{ question: '1+1?', choices: [1, 2, 4, 4], answer: 2 }]);
    manager.createQuiz('Quiz 2', 1, [{ question: '3+3?', choices: [2, 4, 6, 8], answer: 6 }]);

    const quizzes = manager.getAllQuizzes();

    expect(quizzes).toHaveLength(2);
    expect(quizzes[1].title).toBe('Quiz 2');
  });
});
