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

describe("Update Quiz", () => {
  let manager;

  beforeEach(()=>{
    localStorage.clear();
    manager = quizManager();
  });

  test('update quiz data', () => {
    const quiz = manager.createQuiz(
      'Quiz 1', 1, [{ question: '1+1?', choices: { a: 1, b: 2, c: 3, d: 4}, answer: 'b' }]
    );

    const updated = manager.updateQuiz(quiz.id, {
      title: 'Quiz 101', 
      questions: [{ question: '4+4??', choices: { a: 2, b: 4, c: 6, d: 8}, answer: 'd' }]
    })

    expect(updated).toBe(true);
  });
});