const express = require('express');
const router = express.Router();
const problemsController = require('./controllers/problemsController');

// send back any random problem
router.get('/', 
  problemsController.getRandomProblem,
  (req, res) => {
    res.status(200).json(problemDetails);
  }
);

// send back a random problem by difficulty
router.get('/difficulty/:difficulty',
  problemsController.getProblemByDifficulty,
  (req, res) => {
    res.status(200).json(problemDetails);
  }
)

// send back a specific problem
router.get('/problem/:problem',
  problemsController.verifyProblem,
  problemsController.getProblem,
  (req, res) => {
    res.status(200).json(problemDetails);
  }
)

// evaluate a submitted solution
router.post(':problem', 
  problemsController.verifyProblem,
  problemsController.convertToFunction,
  problemsController.evaluateSolution,
  (req, res) => {
    const {evaluation} = res.locals;
    res.status(200).json(evaluation);
  }
);

module.exports = router;
