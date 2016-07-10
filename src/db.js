import mongoose from 'mongoose';
import config from './config';

var connectString = 'mongodb://' + config.host + ':' + config.port + '/Geekymate';
export default connectString;
