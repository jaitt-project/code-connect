const Fizzbuzz = require('./problem-sets/fizzbuzz.js');
const NumIslands = require('./problem-sets/num-islands.js');
const ReverseLinkedList = require('./problem-sets/reverse-linked-list.js');

class Problems {
  constructor() {
    this.length = 0 // position in object used as a problem id
    this.fizzbuzz = new Fizzbuzz(++this.length);
    this.numIslands = new NumIslands(++this.length);
    this.reverseLinkedList = new ReverseLinkedList(++this.length);
  }

  get(problem) {
    return this[problem];
  }

  getRandom() {
    const arrayOfProblems = Object.keys(this).filter(key => key !== 'length'); // don't include length prop
    const randomIndex = Math.floor(Math.random() * this.length);

    const randomProblem = arrayOfProblems[randomIndex];
    return this[randomProblem];
  }

  getByDifficulty(difficulty) {
    const arrayOfProblems = Object.keys(this).filter(key => key !== 'length' && this[key].difficulty === difficulty); // don't include length prop & filter for difficulty
    const randomIndex = Math.floor(Math.random() * arrayOfProblems.length);

    const randomProblem = arrayOfProblems[randomIndex];
    return this[randomProblem];
  }
}

module.exports = Problems;
