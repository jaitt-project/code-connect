const path = require('path');
const express = require('express');
const app = express();
// const db = require('')

const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

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

  res.status(errObj.status).send(errObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
