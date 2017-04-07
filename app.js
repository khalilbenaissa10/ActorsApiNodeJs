var app = require('./src/lib/app')
app.listen(process.env.PORT ||3000)
var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
MongoClient.connect('mongodb://khalil:khalil22307246@ds033607.mlab.com:33607/movies', function (err, db) {
    if (err) {
        throw err;
        console.log(err);
    } else {
        console.log("successfully connected to the database");
    }
    db.close();
});