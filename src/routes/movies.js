var Movie = require('../models/movie');
var Actor = require('../models/actor');

module.exports = {

  getAll: (req, res) => {
    var response = {}
       Movie.find()
            .populate('actors')
            .exec((err, data) => {
            // Mongo command to fetch all data from collection.
              if (err) {
                response = {'error': true, 'message': 'Error fetching data'}
              } else {
                response = data
              }
              res.json(response)
            })
  },


  createOne: function(req, res, next) {
    Movie.create(req.body, function(err, movie) {
      if (err) return res.status(400).json(err);

      res.status(201).json(movie);
    });
  },


  getOne: function(req, res, next) {
    Movie.findOne({ id: req.params.id })
    .populate('actors')
    .exec(function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      res.status(200).json(movie);
    });
  },


  updateOne: function(req, res, next) {
    Movie.findOneAndUpdate({ id: req.params.id }, req.body,{new: true}, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      res.status(200).json(movie);
    });
  },


  deleteOne: function(req, res, next) {
    Movie.findOneAndRemove({ id: req.params.id }, function(err) {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
  },


  addActor: function(req, res, next) {
    Movie.findOne({ id: req.params.id }, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      Actor.findOne({ id: req.body.id }, function(err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        movie.actors.push(actor);
        movie.save(function(err) {
          if (err) return res.status(500).json(err);

          res.status(201).json(movie);
        });
      })
    });
  },


  deleteActor: function(req, res, next) {
    Movie.findOne({ id: req.params.mid }, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      // HACK TO CHANGE
     Actor.findOne({ id: req.params.id })
    .exec(function(err, actor) {
      if (err) return res.status(400).json(err);
      if (!actor) return res.status(404).json();
  
      for (var i = 0; i < movie.actors.length; i++) {
           if(( movie.actors[i]).toString()== actor._id.toString()){
              console.log(movie.actors[i]) ; 
              movie.actors.splice(i,1);
               
           }
           //console.log(movie.actors[i]);
    } 
     // movie.actors.splice(actor.id-movie.actors.length);

        movie.save(function(err) {
        if (err) return res.status(400).json(err);

        res.status(204).json(movie);
      });
    });
    
     
    
    });
  }

};

