import mongoose, {Schema} from 'mongoose';
import connectString from '../../db';

export default class ReportService {
  constructor() {

    var schema = Schema({
      accountId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      testId: {
        type: Schema.Types.ObjectId,
        required: true
      },
      answersId: [Schema.Types.ObjectId],
      modified: {
        type: Date,
        default: Date.now
      }
    });

    if (mongoose.models.Report) {
      this.Model = mongoose.model('Report');
    } else {
      this.Model = mongoose.model('Report', schema);
    }
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

  getReports() {
    this.connect();
    return this.Model.find((err, data) => {
      var result;
      if (err) {
        result = err;
      } else {
        result = data;
      }
      return result;
    });
  }

  saveReport(report) {
    this.connect();

    var callback = (err, data) => {
      if (err) {
        return console.error(err);
      };
      if (data) {
        data.answers.push(report.answerId);
        data.save((err) => {
          var result;
          if (err) {
            return console.error(err);
          }
          return data;
        });
      } else {
        var model = new this.Model({
          accountId: report.accountId,
          testId: report.testId,
          answersId: report.answersId
        });

        return model.save((err) => {
          var result;
          if (err) {
            result = err;
          } else {
            result = model;
          }
          return result;
        });
      }
    };
  }
};
