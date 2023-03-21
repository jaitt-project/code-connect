const {performance} = require('perf_hooks');

class NumIslands {
  constructor(id) {
    this.id = id;
    this.title = 'Stocks';
    this.difficulty = 'medium';
    this.prompt = 'Given an array that represents the variation of a stock during a single day in chronological order, write a function that calculates the highest profit you can make in the given day by buying and selling a single stock. This is comprised of one buy and one sell. Return 0 if no profit is possible or if input is invalid.';
    this.example = `[1000, 500, 1500, 2000, 0] -> The stock began at 1000 and closed at 0`;
    this.solution = `function highestProfit(stocks) {\n  if (!Array.isArray(stocks)) return 0;\n\n  let minPrice = Infinity, maxProfit = 0;\n\n  for (const price of stocks) {\n    if (typeof price !== 'number') return 0;\n\n    if (price < minPrice) minPrice = price;\n    else maxProfit = Math.max(maxProfit, price - minPrice);\n  }\n\n  return maxProfit\n}`;
  }

  evaluate(func) {
    // initialize test resulsts
    const tests = {};

    // Function should return 0 if input is invalid
    try {
      tests['Function should return 0 if input is invalid'] = func(['ten', 'nine', 'eight']) === 0 && func({0: 10, 1: 5, 2: 0}) === 0 && func('stocks') === 0 && func(1000) === 0 && func(undefined) === 0;
    } catch (error) {
      tests['Function should return 0 if input is invalid'] = false;
    }

    // Function should return 0 if there's no possibility of making a profit
    try {
      tests['Function should return 0 if there\'s no possibility of making a profit'] = func([100, 90, 70, 40, 0]) === 0 && func([]) === 0;
    } catch (error) {
      tests['Function should return 0 if there\'s no possibility of making a profit'] = false;
    }

    // Function should return the highest profit possible
    try {
      tests['Function should return the highest profit possible'] = func([0, 2000, 4000, 6000, 8000, 10000]) === 10000 && func([2000, 1000, 100, 200, 400, 100]) === 300 && func([8, 5, 4, 3, 2, 7, 2]) === 5;
    } catch (error) {
      tests['Function should return the highest profit possible'] = false;
    }

    // Function should return the highest profit possible when given multiple possible profits
    try {
      tests['Function should return the highest profit possible when given multiple possible profits'] = func([1000, 500, 1000, 1500, 0, 200, 800, -10, 0, 100]) === 1000 && func([0, 300, 200, 500, 600, 100, 399, 350, 500]) === 600 && func([200, 600, 700, 100, 300, 200, 620]) === 520;
    } catch (error) {
      tests['Function should return the highest profit possible when given multiple possible profits'] = false;
    }

    // check whether all tests passed
    let pass = true;
    for (let test in tests) {
      if (tests[test] === false) pass = false;
    }

    // get function runtime
    let runtime;
    if (pass) {
      const before = performance.now();
      func([1000, 500, 1000, 1500, 0, 200, 800, -10, 0, 100]);
      runtime = performance.now() - before;
    }

    // return overall evaluation
    return {pass, tests, runtime};
  }
}

module.exports = NumIslands;