import mongoose from 'mongoose';
import config from '../../config';

export default class TestService {
  constructor() {
    var connectString = 'mongodb://' + config.host + ':' + config.port + '/Geekymate';
    mongoose.connect(connectString);

    var schema = mongoose.Schema({
      text: {
        type: String,
        required: true
      },
      modified: {
        type: Date,
        default: Date.now
      }
    });

    this.Model = mongoose.model('Tests', schema);

    this.Connect();
  }

  Connect() {
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

    this.db;
  }

  getTests() {
    return this.Model.find((err, result) => {
      if (err) {
        return console.error(err);
      }
      return result;
    })
  }

  saveTest(test) {
    console.log(test);
    var model = new this.Model({
      text: test.text
    });

    return model.save((err) => {
      if (err) {
        return console.error(err);
      }
      return model;
    })
  }
};
