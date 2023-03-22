const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db = require('./database.json');

const PORT = 3000;
app.use(cookieParser());

// routers
const problemsRouter = require('./routes/problems-route.js');
const authRouter = require('./routes/authRouter.js');

app.use(express.json());
app.use(express.urlencoded());

app.use('/client', express.static(path.resolve(__dirname, '../client')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/github', authRouter);
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
