const authController = {};

authController.authenticate = () => {
  console.log('authing')
  fetch('https://github.com/login/oauth/authorize', {
    method: 'GET',
    client_id: 'c39c3106c66253bf31bc',
    redirect_uri: '/',
    headers: 'Content-type: application/json',
  }).then((res) => res.json())
    .then((data) => console.log(data));
};

module.exports = authController;
