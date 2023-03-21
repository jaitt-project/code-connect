const request = require('request');
require('dotenv').config();
const authController = {};

authController.authenticate = (req, res, next) => {
  console.log('authing');
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=c39c3106c66253bf31bc&redirect_uri=http://localhost:8080/&allow_signup=true&scope=user`
  );
  return next();
};

authController.postAuth = (req, res, next) => {
  console.log(
    'authing part 2, token received',
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
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
    next();
  });
};

authController.afterToken = (req, res, next) => {
  console.log('in afterToken');
  const options = {
    url: 'https://api.github.com/user',
    headers: {
      'User-Agent': 'request',
      Authorization: `token ${res.locals.accessToken}`,
    },
  };
  request(options, (error, response, body) => {
    const user = JSON.parse(body);

    res.locals.username = user.login;
    res.locals.authenticated = true;

    next();
  });
};

module.exports = authController;
