const path = require('path');
const authController = require('./controllers/authController');
const express = require('express');
const app = express();
const authRouter = require('./routes/authRouter');
// const db = require('')

const PORT = 3000;

// routers
const problemsRouter = require('./routes/problems-route.js');

app.use(express.json());
app.use(express.urlencoded());

app.use('/client', express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});


app.use('/github', authRouter, (req, res, next) => {
  return res.redirect(`https://github.com/login/oauth/authorize?client_id=c39c3106c66253bf31bc&redirect_uri=http://localhost:8080/&allow_signup=true&scope=user`)
})


app.use('/problems', problemsRouter);


// No build command
// app.use(express.static(path.join(__dirname, '../build')));

app.use('/', (req, res, next) => {
  return next({
    log: 'Express catch all handler caught unknown route',
    status: 404,
    message: { err: 'Route not found' },
  });
});

app.use((err, req, res, next) => {
  const defaultError = {
    log: 'Express error handler caught an unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errObj = Object.assign({}, defaultError, err);
  console.log(errObj.log);

  return res.status(errObj.status).send(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
