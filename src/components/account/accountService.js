import mongoose, {Schema} from 'mongoose';
import connectString from '../../db';

export default class AccountService {
  constructor() {

    var schema = Schema({
      login: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      modified: {
        type: Date,
        default: Date.now
      }
    });

    this.Model = mongoose.model('Account', schema);
  }

  connect() {
    mongoose.connect(connectString);
    var db = mongoose.connection;

    db.once('open', () => {
      console.log('Connection opened.');
    });

    db.on('close', () => {
      console.log('Connection closed.');
    });

    db.on('error', (err) => {
      console.log('connection error:' + err.message);
    });

    this.db = db;
  }

  close() {
    this.db.close();
  }

  registration(user) {
    this.connect();
    var model = new this.Model({
      login: user.login,
      password: user.password
    });

    return model.save((err) => {
      if (err) {
        return err;
      }
      return { status: "ok"};
    });
  }

  authentication(user) {
    console.log(user);
    this.connect();
    console.log('authentication');
    return this.Model.findOne(user, (err, result) => {
      if (err) {
        return err;
      }
      console.log(result);
      return result;
    });
  }
};
