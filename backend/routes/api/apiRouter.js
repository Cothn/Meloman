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
var musicRout = require('./musicRout');
router.use('/music', musicRout);
var playlistRout = require('./playlistRout');
router.use('/playlist', playlistRout);
var postRout = require('./postRout');
router.use('/post', postRout);
var postRout = require('./commentRout');
router.use('/comment', postRout);
var postRout = require('./likeRout');
router.use('/like_in_post', postRout);
var genreRout = require('./genreRout');
router.use('/genre', genreRout);

module.exports = router;