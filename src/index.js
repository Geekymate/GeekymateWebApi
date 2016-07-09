import express from 'express';
import bodyParser from 'body-parser';
import nodeTelegramBotApi from 'node-telegram-bot-api';

import {testController} from './components';

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var port = 9000;

app.get('/api/help', function (req, res) {
  res.json({"help": "help"})
});

app.get('/bot/polling', function (req, res) {
  var TelegramBot = require('node-telegram-bot-api');
  var token = '230686792:AAF42GwXm2ntPWcn1IYKemkt_mBf2QsCQTU';
	// Setup polling way
	var request = require('request');
	var options = {
	  polling: true
	};
	var bot = new TelegramBot(token, options);
	bot.getMe().then(function (me) {
	  console.log('Hi my name is %s!', me.username);
	});
	bot.onText(/\/msg_info/, function (msg) {
	  console.log(msg);
	  bot.sendMessage(msg.chat.id, JSON.stringify(msg));
	});
	bot.on('message', function (msg) {
	  bot.sendMessage(msg.chat.id, 'Что значит ' + msg.text + '?');
	});
});

app.use('/api/tests', testController());

app.listen(port, function () {
  console.log('App listening on port ' + port);
});
