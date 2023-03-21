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

  randomizeAll() {
    const arrayOfProblems = Object.keys(this).filter(key => key !== 'length'); // don't include length prop
    const randomIndex = Math.floor(Math.random() * this.length - 1);

    return arrayOfProblems[randomIndex];
  }

  randomizeEasy() {
    // todo
  }

  randomizeMedium() {
    // todo
  }

  randomizeHard() {
    // todo
  }
}

module.exports = Problems;
