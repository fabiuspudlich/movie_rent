var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET movies.json */
router.get('/movies', function(req, res, next) {
  let movies = [{"forename" : "Peter", "surname" : "Parker", "cNumber" : "12345"}, {"forename" : "Jeffrey", "surname" : "Lebowski", "cNumber" : "54321"}, {"forename" : "Jeff", "surname" : "Bridges", "cNumber" : "13254"}, {"forename" : "Uwe", "surname" : "Boll", "cNumber" : "36253"}, {"forename" : "Hermine", "surname" : "Granger", "cNumber" : "56342"}, {"forename" : "Sarah", "surname" : "Connor", "cNumber" : "36243"}, {"forename" : "Dana", "surname" : "Scully", "cNumber" : "46253"}, {"forename" : "Lisa", "surname" : "Simpson", "cNumber" : "53412"}, {"forename" : "Elisabeth", "surname" : "Swann", "cNumber" : "32756"}, {"forename" : "Clarice", "surname" : "Starling", "cNumber" : "52436"}, {"forename" : "James", "surname" : "Bond", "cNumber" : "46354"}, {"forename" : "Jack", "surname" : "Sparrow", "cNumber" : "56274"}, {"forename" : "James", "surname" : "Kirk", "cNumber" : "14432"}, {"forename" : "Marty", "surname" : "McFly", "cNumber" : "64525"}]
  res.json(movies);
});

module.exports = router;
