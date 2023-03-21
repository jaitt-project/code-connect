const Problems = require('../problems/index.js');
const problems = new Problems;

const problemsController = {};

problemsController.verifyProblem = (req, res, next) => {
  const {problemParam} = req.params;

  // update dash seperated param format to camel case
  const problem = problemParam
    .split('-')
    .map((word, idx) => {
      if (idx !== 0) return word.charAt(0).toUpperCase() + word.slice(1);
      else return word
    })
    .join('');

  // throw to global error handler if problem not in problem sets
  if (!Object.hasOwn(problems, problem)) {
    return next({
      log: `ERROR - problemsController.testSolution failed to locate requested problem.`,
      status: 400,
      message: {err: 'Requested problem does not exist.'},
    })
  }
};

problemsController.convertToFunction = (req, res, next) => {
  const {solution} = req.body;

  // get portion of string that is the function body
  const functionBodyStart = solution.indexOf('{') + 1; // exclude bracket
  const functionBodyEnd = solution.lastIndexOf('}');
  const functionBody = solution.slice(functionBodyStart, functionBodyEnd);

  // get portion of string that is the function parameters
  const functionParamsStart = solution.indexOf('(') + 1; // exclude parens
  const functionParamsEnd = solution.indexOf(')');
  const functionParams = solution.slice(functionParamsStart, functionParamsEnd);

  // create function
  try {
    res.locals.solutionFunc = new Function(...functionParams, functionBody);

    return next();
  } catch (error) {
    // add a failure evaluation
    res.locals.evaluation = {pass: false, error: error};
  }
};

problemsController.evaluateSolution = (req, res, next) => {
  if (res.locals.evaluation) return next(); // skip if evaluation already exists

  const {problem} = req.params;
  const {solutionFunc} = res.locals;

  res.locals.evaluation = problems[problem].evaluate(solutionFunc);

  return next();
};

module.exports = problemsController;
