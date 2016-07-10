import { Router } from 'express';
import AccountService from './accountService';

export default function() {
  var accountController = Router();
  var accountService = new AccountService();
  accountController.route('/signup')
    .post((req, res) => {
      let user = req.body;
      let promise = accountService.registration(user);
      promise.then((user) => {
        res.json(user);
      });
  });

  accountController.route('/signin')
  .post((req, res) => {
    let user = res.body;
    let query = accountService.authentication(user);
    let promise = query.exec();
    promise.then((result) => {
      if (result) {
        res.status(400).json({status: "ok"});
      } else {
        res.status(404).json({status: "no found user"})
      }
    });
  });

  return accountController;
}
