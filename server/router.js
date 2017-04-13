'use strict';

var express = require('express');
var router = express();

var expressoController = require('./controllers/expressoController');

router.get('/healthcheck', function (req, res) {
  res.send('ok');
});

router.use('/expresso', expressoController);

module.exports = router;