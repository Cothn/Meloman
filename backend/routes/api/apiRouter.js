var express = require('express');
var router = express.Router();

/* GET home page.
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Express' });
});
*/
var usersRout = require('./usersRout');
router.use('/user', usersRout);
var trackRout = require('./trackRout');
router.use('/track', trackRout);

module.exports = router;