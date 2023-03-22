const express = require('express');
const app = require('../server');
require('dotenv').config();

const authController = require('../controllers/authController.js');
const router = express.Router();

router.get('/login', authController.authenticate);

router.get('/', (req, res) => {
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = 'http://localhost:8080/github/callback';
  const scope = 'user';
  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&allow_signup=true&scope=${scope}`;
  res.redirect(url);
});

router.get(
  '/callback',
  authController.postAuth,
  authController.afterToken,
  // authController.verifyUser,
  authController.jsonToken,
  (req, res) => {
    console.log('second middleware chain is finished');
    return res.redirect('/');
  }
);

module.exports = router;
