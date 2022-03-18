var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET movies.json */
router.get('/get_movies', function(req, res, next) {
  let movies = [{"title" : "The Avengers", "available" : "5", "price" : "2€"}, {"title" : "Matrix", "available" : "7", "price" : "2€"}, {"title" : "Enter The Void", "available" : "3", "price" : "2€"}]
  res.json(movies);
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
