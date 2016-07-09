import { Router } from 'express';
import TestService from './testService';

export default function() {
  var testController = Router();
  var testService = new TestService();
  testController.route('/')
    .get((req, res) => {
      let query = testService.getTests();
      let promise = query.exec();
      promise.then((tests) => {
        res.json(tests);
      });
    })
    .post((req, res) => {
      let test = {
        text: req.body.text
      };
      let promise = testService.saveTest(test);
      promise.then((test) => {
        res.json(test);
      });
    });

  return testController;
}
