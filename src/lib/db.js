var mongoose = require('mongoose');
var mongoUrl = process.env.MONGO_URL || 'mongodb://khalil:khalil22307246@ds033607.mlab.com:33607/movies';

module.exports = function(app) {
  mongoose.connect(mongoUrl, {
    mongoose: {
      safe: true
    }
  }, function(err) {
    if (err) {
      return console.log('Mongoose - connection error:', err);
    }
  });

  // mongoose.set('debug', true);

  return mongoose;
};
