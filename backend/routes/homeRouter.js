var express = require('express');
var router = express.Router();
const homeController = require("../controllers/homeController.js");

/* GET home page.
router.get('/', function(request, response, next) {
  response.render('index', { title: 'Express' });
});
*/

router.get('/home', homeController.index);
router.get('/',function (req, res) {
    res.redirect('/view');
})

module.exports = router;
