const {performance} = require('perf_hooks');

class GetAllProducts {
  constructor(id) {
    this.id = id;
    this.title = 'Get All Products';
    this.difficulty = 'medium';
    this.prompt = 'Given an array of at least two integers (which may be positive, negative, or zero), return an array of all the possible products made by multiplying all but one number. In other words, find all the products of multiplying any array.length - 1 numbers in the array.';
    this.example = `getAllProducts([1, 7, 3, 4]) -> [84, 12, 28, 21]\ngetAllProducs([2, 5, 3]) -> [15, 6, 10]`;
    this.solution = `function getAllProducts(array) {\n  let zeroCount = 0, prod = 1;\n  let zeroIndex;\n\n  for (let i = 0; i < array.length; i++) {\n    if (array[i] === 0) {\n      zeroCount++;\n      zeroIndex = i;\n\n      if (zeroCount === 2) break;\n    }\n    else {\n      prod *= array[i];\n    }\n  }\n\n  if (zeroCount === 0) {\n    return array.map(el => prod / el);\n  }\n  else if (zeroCount === 1) {\n    const result = new Array(array.length).fill(0);\n    result[zeroIndex] = prod;\n    return result;\n  }\n  else {\n    return new Array(array.length).fill(0);\n  }\n}`;
  }

  evaluate(func) {
    // initialize test resulsts
    const tests = {};

    // Handles all numbers being nonzero
    try {
      const result1 = func([6, 2]).sort();
      const result2 = func([3, 2, 5]).sort();
      const result3 = func([1, 7, 3, 4]).sort();

      tests['Handles all numbers being nonzero'] = result1.length === 2 && result1[0] === 2 && result1[1] === 6 && result2.length === 3 && result2[0] === 10 && result2[1] === 15 && result2[2] === 6 && result3.length === 4 && result3[0] === 12 && result3[1] === 21 && result3[2] === 28 && result3[3] === 84;
    } catch (error) {
      tests['Handles all numbers being nonzero'] = false;
    }
      
    // Handles exactly one number equal to zero
    try {
      const result1 = func([0, 3, 4, 2]).sort();
      const result2 = func([6, 0, 1]).sort();
      const result3 = func([3, 1, 2, 0, 5]).sort();
      
      tests['Handles exactly one number equal to zero'] = result1.length === 4 && result1[0] === 0 && result1[1] === 0 && result1[2] === 0 && result1[3] === 24 && result2.length === 3 && result2[0] === 0 && result2[1] === 0 && result2[2] === 6 && result3.length === 5 && result3[0] === 0 && result3[1] === 0 && result3[2] === 0 && result3[3] === 0 && result3[4] === 30;
    } catch (error) {
      tests['Handles exactly one number equal to zero'] = false;
    }
    
    // Handles two or more numbers equal to zero
    try {
      const result1 = func([0, 3, 4, 0]).sort();
      const result2 = func([9, 0, 0, 0, 4, 7]).sort();

      tests['Handles two or more numbers equal to zero'] = result1.length === 4 && result1[0] === 0 && result1[1] === 0 && result1[2] === 0 && result1[3] === 0 && result2.length === 6 && result2[0] === 0 && result2[1] === 0 && result2[2] === 0 && result2[3] === 0 && result2[4] === 0 && result2[5] === 0;
    } catch (error) {
      tests['Handles two or more numbers equal to zero'] = false;
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
      func([9, 0, 0, 0, 4, 7]);
      runtime = performance.now() - before;
    }

    // return overall evaluation
    return {pass, tests, runtime};
  }
}

module.exports = GetAllProducts;