import express from 'express';
import bodyParser from 'body-parser';
import TelegramBot from 'node-telegram-bot-api';

import {testController} from './components';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 9000;

app.use(function(req, res, next) {
  console.log('Тут был');
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
	  bot.sendMessage(msg.chat.id, 'Что значит ' + msg.text + '?');
	});
	bot.onText(/\/start_test/, (msg) => {
		console.log(msg);
		var testId = msg.text.split(' ')[1];
		var TestService = require ('./components/test/testService');
		// var testItem = TestService.getTest(testId);
		// TODO: найти тест, добавить отчёт о прохождении теста
		// отправить первый вопрос
		console.log(TestService.default;
		console.log(TestService.getTest);
		bot.sendMessage(msg.chat.id, testId);
	});
});

app.use('/api/tests', testController());

app.listen(port, () => {
  console.log('App listening on port ' + port);
});
