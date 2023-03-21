const express = require('express');
const app = require('../server');
require('dotenv').config();

const authController = require('../controllers/authController');
const router = express.Router();

router.use(
  '/github',
//   authController.authenticate,
  authController.postAuth,
  authController.afterToken,
  (req, res) => {
    console.log('User authenticated by github');
    // res.cookie()
    return res.redirect('/');
  }
);

router.post('/github', (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = 'http://localhost:8080/';
  const scope = 'user';
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}
    &redirect_uri=${redirect_uri}&allow_signup=true&scope=${scope}`;
    res.json({ url });
    return res.redirect(url);
});

// router.get('/github', (req, res) => {
//     const client_id = process.env.CLIENT_ID;
//     const redirect_uri = 'http://localhost:8080/';
//     const scope = 'user';
//     const url = `https://github.com/login/oauth/authorize?client_id=${client_id}
//       &redirect_uri=${redirect_uri}&allow_signup=true&scope=${scope}`;

//     res.json({ url });
//   });

module.exports = router;
