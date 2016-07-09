import express from 'express';
import bodyParser from 'body-parser';

import {testController} from './components';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 9000;

app.get('/api/help', function (req, res) {
  res.json({"help": "help"})
});

app.use('/api/tests', testController());

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
