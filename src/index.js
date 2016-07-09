import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';

import {testController} from './components';

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 9000;

app.get('/api/help', (req, res) => {
  res.json({"help": "help"})
});

app.get('/bot/polling', (req, res) => {
  var token = '230686792:AAF42GwXm2ntPWcn1IYKemkt_mBf2QsCQTU';
	// Setup polling way
	var options = {
	  polling: true
	};
	var bot = new TelegramBot(token, options);
	bot.getMe().then((me) => {
	  console.log('Hi my name is %s!', me.username);
	});
	bot.onText(/\/msg_info/, (msg) => {
	  console.log(msg);
	  bot.sendMessage(msg.chat.id, JSON.stringify(msg));
	});
	bot.on('message', (msg) => {
	  bot.sendMessage(msg.chat.id, 'Что значит тыкать' + msg.text + '?');
	});
});

app.use('/api/tests', testController());

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
