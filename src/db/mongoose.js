const mongoose = require('mongoose');

const mongoURL = process.env.MONGODB_CLOUD_URL.replace(
  '<password>',
  process.env.MONGODB_CLOUD_PASSWORD
);
const connectDB = () => {
  return mongoose.connect(mongoURL);
};
module.exports = connectDB;
