var express = require('express');
var cors = require('cors')
var app     = express();

require('./db')(app);
require('./parser')(app);

var actors = require('../routes/actors');
var movies = require('../routes/movies');

// Cross Origin middleware
app.use(function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.use(cors())

// Actors routes
app.route('/actors')
.get(actors.getAll)
.post(actors.createOne);

app.route('/actors/:id')
.get(actors.getOne)
.put(actors.updateOne)
.delete(actors.deleteOne);

app.post('/actors/:id/movies', actors.addMovie);
app.delete('/actors/:id/movies/:mid', actors.deleteMovie);


// Movies routes
app.route('/movies')
.get(movies.getAll)
.post(movies.createOne);

app.route('/movies/:id')
.get(movies.getOne)
.put(movies.updateOne)
.delete(movies.deleteOne);

app.post('/movies/:id/actors', movies.addActor);
app.delete('/movies/:mid/actors/:id', movies.deleteActor);


module.exports = app;
