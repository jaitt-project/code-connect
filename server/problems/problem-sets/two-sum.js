const {performance} = require('perf_hooks');

class NumIslands {
  constructor(id) {
    this.id = id;
    this.title = 'Two Sum';
    this.difficulty = 'easy';
    this.prompt = 'Given an array of numbers and a target number, return true if two of the numbers in the array add up to the target. Otherwise, return false. You may assume that each input would have exactly one solution, and you may not use the same element twice.';
    this.example = `const nums = [2, 5, 11, 15]\ntwoSum(num, 7) -> true\nRational:  nums[0] + nums[1] = 2 + 5 = 7\ntwoSum(nums, 9) -> false\nRational: No elements inside the array sum up to the target number`;
    this.solution = `function(arr, target) {\n  const cache = new Map();\n\n  for (let i = 0; i < arr.length; i++) {\n    cache.set(arr[i], i);\n  }\n\n  for (let i = 0; i < arr.length; i++) {\n  if (cache.has(target - arr[i]) && cache.get(target - arr[i]) !== i) return true;\n  }\n\n  return false;\n}`;
  }

  evaluate(func) {
    // initialize test resulsts
    const tests = {};

    // Should return true if two numbers sum to n
    try {
      tests['Should return true if two numbers sum to n'] = func([1, 4, 6, 12, 9]) === true && func([1, 4, 6, 12, 9]) === true && func([1, 4, 7, 2, 9, 0]) === true;
    } catch (error) {
      tests['Should return true if two numbers sum to n'] = false;
    }
    
    // Should work with negative numbers
    try {
      tests['Should work with negative numbers'] = func([-1, 4, 6, 12, 9]) === true && func([-1, -1, -2, -4, -5]) === true;
    } catch (error) {
      tests['Should work with negative numbers'] = false;
    }
    
    // should return false if two numbers DO NOT sum to n 
    try {
      tests['Should return false if two numbers DO NOT sum to n'] = func([1, 4, 6, 12, 9]) === false && func([1, 4, 6, 12, 9]) === false && func([1, 4, 7, 2, 9, 0]) === false;
    } catch (error) {
      tests['Should return false if two numbers DO NOT sum to n'] = false;
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
      func([-1, 4, 6, 12, 9]);
      runtime = performance.now() - before;
    }

    // return overall evaluation
    return {pass, tests, runtime};
  }
}

module.exports = NumIslands;