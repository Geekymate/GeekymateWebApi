import mongoose, {Schema} from 'mongoose';
import config from '../../config';

export default class TestService {
  constructor() {
    var connectString = 'mongodb://' + config.host + ':' + config.port + '/Geekymate';
    mongoose.connect(connectString);

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

  getTest(id) {
    return this.Model.findById(id, (err, result) => {
      if (err) {
        return console.error(err);
      }
      return result;
    })
  }

  saveTest(test) {
    var model = new this.Model({
      title: test.title,
      questions: test.questions
    });

    return model.save((err) => {
      if (err) {
        return err;
      }
      return model;
    })
  }
};
