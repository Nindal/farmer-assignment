const express = require('express');
const bodyParser = require("body-parser");
const morgan = require('morgan');
const farmRouter = require('./app/routes/farmer.routes');
const authRouter = require('./app/routes/auth.routes');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use(morgan('combined'))

app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  next();
});

app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
app.use('/api/farmer', farmRouter);
app.use('/api/auth',authRouter);

module.exports = app;