const {performance} = require('perf_hooks');

class BinToDec {
  constructor(id) {
    this.id = id;
    this.title = 'Bin to Dec';
    this.difficulty = 'easy';
    this.prompt = 'Given a string that represents a Binary Number, write a function that converts this string into a decimal number.';
    this.example = `binToDec('0') -> 0\nbinToDec('11') -> 3\nbinToDec('100') -> 4\nbinToDec('101') -> 5\nbinToDec('0101') -> 5`;
    this.solution = `function(binary) {\n  let index = 0\n  let sum = 0;\n\n  for (let i = binary.length - 1; i > -1; i--) {\n    if (binary[i] == '1') sum += Math.pow(2, index);\n    index++;\n  }\n\n  return sum;\n}`;
  }

  evaluate(func) {
    // initialize test resulsts
    const tests = {};

    // Should return correct conversion
    try {
      tests['Should return correct conversion'] = func('101') === 5 && func('11111100100') === 2020;
    } catch (error) {
      tests['Should return correct conversion'] = false;
    }
   
    // Should ignore leading zeroes
    try {
      tests['Should ignore leading zeroes'] = func('0000000010101') = 21
    } catch (error) {
      tests['Should ignore leading zeroes'] = false;
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
      func('11111100100');
      runtime = performance.now() - before;
    }

    // return overall evaluation
    return {pass, tests, runtime};
  }
}

module.exports = BinToDec;