/**
 * Created by refael yehuda on 12/24/2015.
 */

var http = require('http');
var url = require('url');
var express = require('express');
var logger = require('morgan');

var app = express();
var router = express.Router();

router.use(logger());
router.use(express.static(__dirname + '/../client'));

/*
var templates = require('./routes/templates.js');
var screens = require('./routes/screens.js');

app.use('/templates', templates);
app.use('/screens', screens);
*/
app.use('/', router);
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});



var server = app.listen(8080 , function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});