var express = require('express');
var router = express.Router();
fs = require('fs');

/* index.html an den Browser senden */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET movies and users */
router.get('/get_data', function(req, res, next) {

  // erstelle data-Objekt, um es an den Browser zu senden
  let data = {
    users: null,
    movies: null
  }

  // users.json Datei lesen
  fs.readFile('database/users.json', 'utf8', function(err, users) {
    if (err) { return console.log(err) };
    data.users = users
  });

  // movies.json Datei lesen
  fs.readFile('database/movies.json', 'utf8', function(err, movies) {
    if (err) { return console.log(err) };
    data.movies = movies
  });

  // Daten an den Browser senden
  res.json(data);

});





/* Save movies.json */
router.post('/save_movies', function(req, res, next) {
  /*fs.writeFile('movies.json', JSON.stringify(req), function (err) {
    if (err) {return console.log(err)};
  });*/
  console.log(req)
  console.log(req.body)
  res.json('erfolgreich');
});

module.exports = router;
