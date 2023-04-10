import express from 'express';
import cerateError from 'http-errors';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import route from './src/routes/index.js';
dotenv.config();
const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// matching route
route(app);

// handle no matching route
app.use((req, res, next) => {
  next(cerateError.NotFound('This route does not exist!'));
});

// handle catch error
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    error: cerateError[err.status || 500].name,
    message: err.message,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server app listening on port ${PORT}`);
});
