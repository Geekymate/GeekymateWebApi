import { Router } from 'express';
import ReportService from './reportService';

export default function() {
  var reportController = Router();
  var reportService = new ReportService();
  reportController.route('/')
    .get((req, res) => {
      let query = reportService.getReports();
      let promise = query.exec();
      promise.then((tests) => {
        res.json(tests);
      });
    });

  return reportController;
}
