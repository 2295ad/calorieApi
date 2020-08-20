const express = require('express');
const app = express();
const users = require('./users')
const calories = require('./calories')
const { ErrorHandler } = require('../error')


//add common success response
app.use(function(req,res,next) {
  res.locals = {
    success:true,
  };
  return next();
});

app.use('/auth',users)
app.use('/calories', calories)



app.use('*', (req, res) => {
    throw new ErrorHandler('Internal server error');
  })

module.exports = app;