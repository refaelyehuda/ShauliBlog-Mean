/**
 * Created by refael yehuda on 12/24/2015.
 */

var MongoClient = require('mongodb').MongoClient , format = require('util').format;
var ObjectId = require('mongodb').ObjectID;
var http = require('http');
var url = require('url');
var express = require('express');
var logger = require('morgan');
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var router = express.Router();

router.use(logger());
app.use(bodyParser.json());
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

//FIXME need to fix delete fan
app.delete("/deletefan" , function(request, response){
    console.log(request.body);
});


//get the location of the branches
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
//get the fans that contains in the DB
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

app.put("/updatefan", function(request, response){
    console.log(request.body);
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Users');
            //find the fan that need to update according the id and update the data
            collection.updateOne(
                { "_id" : new ObjectId(request.body._id) },
                {
                    $set: {"Username":request.body.Username, "Firstname":request.body.Firstname ,"Lastname":request.body.Lastname,
                    "Gender":request.body.Gender,"Birthdate":request.body.Birthdate,"Seniority":request.body.Seniority},
                    $currentDate: { "lastModified": true }
                }, function(err, results) {
                    if(!err){
                        console.log("update fan success");
                        db.close();
                    }else{
                        db.close();
                        console.log("error with update fan");
                    }

                });
        }else{
            console.log(err);
        }
    });

    response.send("The fan is updated");
});

var server = app.listen(8080 , function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('app listening at http://%s:%s', host, port);
});