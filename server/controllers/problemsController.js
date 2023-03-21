const Problems = require('../problems/index.js');
const problems = new Problems;

const problemsController = {};

problemsController.getProblem = (req, res, next) => {
  const {problem} = res.locals;

  res.locals.problemDetails = problems.get(problem);
  return next();
}

problemsController.getRandomProblem = (req, res, next) => {
  res.locals.problemDetails = problems.getRandom();
  return next();
}

problemsController.getProblemByDifficulty = (req, res, next) => {
  const {difficulty} = req.params;
  
  res.locals.problemDetails = problems.getByDifficulty(difficulty);
  return next();
}

problemsController.verifyProblem = (req, res, next) => {
  const {problem} = req.params;
  
  // update dash seperated param format to camel case
  formattedProblem = problem
    .split('-')
    .map((word, idx) => {
      if (idx !== 0) return word.charAt(0).toUpperCase() + word.slice(1);
      else return word
    })
    .join('');

    // throw to global error handler if problem not in problem sets
  if (!Object.hasOwn(problems, formattedProblem)) {
    return next({
      log: `ERROR - problemsController.testSolution failed to locate requested problem.`,
      status: 400,
      message: {err: 'Requested problem does not exist.'},
    })
  }

  res.locals.problem = formattedProblem;
  return next();
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
    res.locals.evaluation = {pass: false, error: 'Invalid function'};
    return next();
  }
};

problemsController.evaluateSolution = (req, res, next) => {
  if (res.locals.evaluation) return next(); // skip if evaluation already exists
  
  const {problem} = res.locals;
  const {solutionFunc} = res.locals;

  res.locals.evaluation = problems[problem].evaluate(solutionFunc);
  return next();
};

module.exports = problemsController;
