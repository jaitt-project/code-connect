const express = require('express');
const app = require('../server');
const authController = require('../controllers/authController');
const router = express.Router();

router.use(
  '/github',
  authController.authenticate,
  authController.postAuth,
  authController.afterToken,
  (req, res) => {
    console.log('USer authenticated by github');
    // res.cookie()
   return res.redirect('/');
  }
);

router.post('/github', (req, res) => {
  const client_id = 'c39c3106c66253bf31bc';
  const redirect_uri = 'http://localhost:8080/';
  const scope = 'user';
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}
    &redirect_uri=${redirect_uri}&allow_signup=true&scope=${scope}`;

  res.json({ url });
});

module.exports = router;
