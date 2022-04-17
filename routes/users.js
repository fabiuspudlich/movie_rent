var express = require('express');
var router = express.Router();
fs = require('fs');

let data = {
  movies: null,
  users: null
}

/* index.html an den Browser senden */
router.get('/', function(req, res, next) {
    //  get users
    getUsers(function (cb) {
        data.users = cb.users
    });
    //  get movies
    getMovies(function (cb) {
        data.movies = cb.movies
        res.json({data: data});
    });
  });

  var getUsers = function(cb) {
    // users.json Datei lesen
    fs.readFile('database/users.json', 'utf8', function(err, users) {
      if (err) { return console.log(err) };
      cb({users: JSON.parse(users)});
    });
  }
  
  var getMovies = function(cb) { 
    // movies.json Datei lesen
    fs.readFile('database/movies.json', 'utf8', function(err, movies) {
      if (err) { return console.log(err) };
      cb({movies: JSON.parse(movies)});
    });
  }

module.exports = router;
