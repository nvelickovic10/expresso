'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var router = require('./router');

var app = express();

app.use(express.static(__dirname + '/../dist/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(router);

app.get('*', function (req, res) {
    res.sendFile('index.html', {
        root: path.join(__dirname, '/../dist/')
    });
});


var server = app.listen(5000, 'localhost', function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});