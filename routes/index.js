const express = require('express');
const app = express();
const users = require('./users')
const calories = require('./calories')
const { ErrorHandler } = require('../error')


//add common success response
app.use(function(req,res,next) {
  res.locals = {
    success:true,
    msg:""
  };
  return next();
});

//all routes
app.use('/auth',users)
app.use('/calories', calories)


//error handling for unavailable routes
app.use('*', (req, res) => {
    throw new ErrorHandler('Internal server error');
  })

module.exports = app;