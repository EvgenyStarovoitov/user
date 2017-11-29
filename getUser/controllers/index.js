var express = require('express')
    , router = express.Router();

router.use('/users', require('../controllers/users'));

router.get('/', function(req, res) {
    res.render('home');
});

module.exports = router;