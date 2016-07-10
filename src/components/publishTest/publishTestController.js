import { Router } from 'express';
import TelegramBotService from '../telegrambot/telegrambotservice';
import TestService from '../test/testService';

export default function() {
  var publishTestController = Router();
  var telegramBotService = new TelegramBotService();
  var testService = new TestService();
  publishTestController.route('/')
    .post((req, res) => {
      var test = req.body;
      let query = testService.getTest(test.id);
      let promise = query.exec();
      promise.then((test) => {
        telegramBotService.publish(test);
        res.sendStatus(200);
      });
  });

  return publishTestController;
}
