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
      var test = req.body;
      let promise = testService.saveTest(test);
      promise.then((test) => {
        res.json(test);
      });
  });

  testController.route('/:id')
  .get((req, res) => {
    let query = testService.getTest(req.params.id);
    let promise = query.exec();
    promise.then((err, test) => {
      if (err) {
        res.send(err);
      } else {
        res.json(test);
      }

    });
  });

  return testController;
}
