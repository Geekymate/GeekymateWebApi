import express from 'express';
import bodyParser from 'body-parser';

import {
  testController,
  accountController,
  publishTestController,
  reportController
} from './components';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
var port = 9000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/api/help', (req, res) => {
  res.json({"help": "help"})
});

app.use('/api/tests', testController());

app.use('/api/accounts', accountController());

app.use('/api/publish', publishTestController());

app.use('/api/reports', reportController());

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
