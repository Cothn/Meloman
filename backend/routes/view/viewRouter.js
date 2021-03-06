var express = require('express');
var router = express.Router();
const userController = require("../../controllers/view/usersViewController.js");

var usersRout = require('./usersRout');
router.use('/user', usersRout);

var trackRout = require('./trackRout');
router.use('/track', trackRout);

var playlistRout = require('./playlistRout');
router.use('/playlist', playlistRout);



var otherRout = require('./otherRout');
router.use('/', otherRout);

router.get('/authenticate', userController.authenticateUser);

router.get('/', userController.getMain);
router.get('/guest', userController.getGuest);


module.exports = router;