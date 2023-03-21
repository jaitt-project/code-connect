class Fizzbuzz {
  constructor(id) {
    this.id = id;
    this.title = 'Fizzbuzz'
    this.difficulty = 'easy';
    this.prompt = 'Write a function that takes in a number n and returns an array containing the numbers 1 to n. Put "fizz" in place of numbers divisble by 3 but not by 5, "buzz" in place of numbers divisble by 5 but not by 3, and "fizzbuzz" in place of numbers divisble by both 3 and 5.'
    this.example = `fizzbuzz(16) -> [1, 2, 'fizz', 4, 'buzz', 'fizz', 7, 8, 'fizz', 'buzz', 11, 'fizz', 13, 14, 'fizzbuzz', 16]`
    this.solution = `function(n) {\n  const result = [];\n\n  for (let i = 1; i <= n; i++) {\n    if (i % 3 === 0 && i % 5 === 0) result.push('fizzbuzz');\n    else if (i % 3 === 0) result.push('fizz');\n    else if (i % 5 === 0) result.push('buzz');\n    else result.push(i);\n  }\n\n  return result;\n};`
  }

  evaluate(func) {
    // run func with test case and get time to run function
    const before = Date.now();
    let result;

    try {
      result = func(31);
    } catch (error) {
      return {pass: false, error: error};
    }
    
    const runtime = Date.now() - before;

    // run test suite
    const tests = {
      'Should have length n': result.length === 31,
      'Should work for non-multiples of 3 and 5': result[0] === 1 && result[6] === 7 && result[10] === 11,
      'Should work for multiples of 3': result[2] === 'fizz' && result[5] === 'fizz' && result[5] === 'fizz',
      'Should work for multiples of 5': result[4] === 'buzz' && result[9] === 'buzz',
      'Should work for multiples of 3 and 5': result[14] === 'fizzbuzz' && result[29] === 'fizzbuzz',
    };
    
    // check whether all tests passed
    let pass = true;

    for (let test in tests) {
      if (tests[test] === false) pass = false;
    }

    // return overall evaluation
    return {pass, tests, runtime}
  }
}

module.exports = Fizzbuzz;
