'use strict';

var express = require('express'),
    app = express(),
    router = express.Router(), 
    path = require('path');

app.use('/app', express.static(__dirname + '/dist'));

app.get('/', function(req, res) {
    res.sendfile('dist/index.html');
});
app.listen(8085, function () {
    console.log('server started at port 8085, hit url localhost:8085/app');
});