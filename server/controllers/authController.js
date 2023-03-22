const request = require('request');
require('dotenv').config();
const authController = {};
const jwt = require('jsonwebtoken');

authController.authenticate = (req, res, next) => {
  console.log('authenticate start');
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=http://localhost:8080/&scope=user&allow_signup=true`
  );
};

authController.postAuth = (req, res, next) => {
  console.log('post auth start');
  const url = `https://github.com/login/oauth/authorize?client_id=c39c3106c66253bf31bc&redirect_uri=http://localhost:8080/&allow_signup=true&scope=user`;
  console.log('authing part 2, token received');
  const code = req.query.code;
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  const redirect_uri = 'http://localhost:8080/';
  // const state = 'ADHgfBdauibf137';
  // const allow_signup = true;
  // const scope = 'user';

  const options = {
    url: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    headers: {
      Accept: 'application/json',
    },
    form: {
      client_id: client_id,
      client_secret: client_secret,
      code: code,
      redirect_uri: redirect_uri,
    },
  };
  request(options, (err, response, body) => {
    res.locals.accessToken = JSON.parse(body).access_token;
    console.log('post auth end');
    return next();
  });
};

authController.afterToken = (req, res, next) => {
  console.log('afterTOken start');
  const options = {
    url: 'https://api.github.com/user',
    method: 'GET',
    headers: {
      'User-Agent': 'request',
      Authorization: `Bearer ${res.locals.accessToken}`,
    },
  };
  request(options, (error, response, body) => {
    const user = JSON.parse(body);

    res.locals.username = user.login;
    res.locals.authenticated = true;

    console.log('afterTOken end');
    return next();
  });
};

authController.jsonToken = (req, res, next) => {
  console.log('jwt start');
  const token = jwt.sign(
    { user: res.locals.username },
    process.env.CLIENT_SECRET,
    { expiresIn: '1 day' }
  );
  res.locals.jwt = token;
  console.log('token created');
  res.cookie('JWT', token, { httpOnly: false });
  console.log('jwt end');
  return next();
};

module.exports = authController;
