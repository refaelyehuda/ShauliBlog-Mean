/**
 * Created by refael yehuda on 12/24/2015.
 */

var MongoClient = require('mongodb').MongoClient , format = require('util').format;
var http = require('http');
var url = require('url');
var express = require('express');
var logger = require('morgan');
var fs = require('fs');
var path = require('path');

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

app.get("/locations", function(request, response){
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Locations');
            //find all ads in collection that have the screen id
            collection.find().toArray(function (err, data) {
            response.send({JSON : data});
            });
        }else{
            console.log(err);
        }
    });

});

app.get("/fansclub", function(request, response){
    console.log("fansclub connection establish");
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Users');
            //find all ads in collection that have the screen id
            collection.find().toArray(function (err, data) {
                response.send({JSON : data});
            });
        }else{
            console.log(err);
        }
    });
});


var server = app.listen(8080 , function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});