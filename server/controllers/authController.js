const request = require('request');
const authController = {};

authController.authenticate = (req, res, next) => {
  console.log('authing');
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=c39c3106c66253bf31bc&redirect_uri=http://localhost:8080/&allow_signup=true&scope=user`
  );
  return next();
};

authController.postAuth = (req, res, next) => {
  console.log('authing part 2, token received');
  const code = req.query.code;
  const client_id = 'c39c3106c66253bf31bc';
  const client_secret = '2b349e4a5c580d9e61ab284dda700a716f36b2cf';
  const redirect_uri = 'http://localhost:8080/';
  const state = 'ADHgfBdauibf137';
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
      state: state,
    },
  };
  request(options, (err, response, body) => {
    res.locals.accessToken = JSON.parse(body).access_token;
    return next();
  });
};

authController.afterToken = (req, res, next) => {
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

    return next();
  });
};

module.exports = authController;
