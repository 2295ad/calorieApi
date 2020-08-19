const express = require('express')
const bodyParser  = require("body-parser");
const pino = require('pino');
const expressPino = require('express-pino-logger');
const compression = require('compression')
const { handleError } = require('./error')
const timeout = require('connect-timeout')


//logging using pino
const logger = pino({ level: process.env.LOG_LEVEL || 'info' });
const expressLogger = expressPino({ logger });


const port = process.env.PORT || 3001;
const app = express()
const restService = require("./routes/index");

//gzip compression
app.use(timeout('5s'))
app.use(compression())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressLogger)
app.use('/', restService);


//common error handler
app.use((err, req, res, next) => {
    handleError(err, res);
  });

app.listen(port,()=>{
    console.log('API IS RUNNING!!!')
})
