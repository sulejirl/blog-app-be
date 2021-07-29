const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({ path: `./.env.${process.env.NODE_ENV || 'production'}` });
const port = process.env.PORT || 3001;

const options = {
  useNewUrlParser: true,
  allowDiskUse:true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
  autoIndex: false, // Don't build indexes
  poolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4 // Use IPv4, skip trying IPv6
};
const mongoUri = process.env.MONGO_URI
if (!module.parent) {
  app.listen(port, () => {
    console.log('Magic happens on port ' + port);
    mongoose.connect(mongoUri, options);
    const conn = mongoose.connection;
    conn.on('error', console.error.bind(console, 'connection error:'));
    conn.once('open', () => {
      console.log('Connected to Database');
    });
  });
}
