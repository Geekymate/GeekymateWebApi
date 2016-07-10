import mongoose, {Schema} from 'mongoose';
import connectString from '../../db';

export default class TestService {
  constructor() {

    var schema = Schema({
      title: {
        type: String,
        required: true
      },
      questions: [{
        title: String,
        answers: Schema.Types.Mixed,
        correct_answer: Number,
        modified: {
          type: Date,
          default: Date.now
        }
      }],
      modified: {
        type: Date,
        default: Date.now
      }
    });

    this.Model = mongoose.model('Tests', schema);
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
    return;
  }

  getTests() {
    console.log('getTests()');
    this.connect();
    return this.Model.find((err, data) => {
      var result;
      if (err) {
        result = err;
      } else {
        result = data;
      }
      // this.close();
      return result;
    });
  }

  getTest(id) {
    this.connect();
    return this.Model.findById(id, (err, data) => {
      var result;
      if (err) {
        result = err;
      } else {
        result = data;
      }
      // this.close();
      return result;
    });
  }

  saveTest(test) {
    this.connect();
    var model = new this.Model({
      title: test.title,
      questions: test.questions
    });

    return model.save((err) => {
      var result;
      if (err) {
        result = err;
      } else {
        result = model;
      }
      // this.close();
      return result;
    });
  }
};
