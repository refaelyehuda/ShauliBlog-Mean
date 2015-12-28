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

app.use('/', router);
app.get("/", function(request, response){
    response.sendFile(__dirname + "/index.html");
});

//FIXME need to fix delete fan

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
app.get("/fans", function(request, response){
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

app.put("/fans", function(request, response){
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

//get the screenId that entered to delete
app.param('fanId', function(req, res, next, fanId) {
    // print  screenId to console
    console.log('fanId : ' + fanId);
    req.fanId = fanId;
    //check if we have more routes to do
    next();
});

app.delete("/fans=:fanId" , function(request, response){
    console.log(request.fanId);
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Users');
            //find the fan that need to update according the id and update the data
            collection.deleteOne(
                {"_id": new ObjectId(request.fanId)},
                function(err, results) {
                    if(!err){
                        console.log("remove fan success");
                        //find all ads in collection that have the screen id
                        collection.find().toArray(function (err, data) {
                            if(!err){
                                response.send({JSON : data});
                                db.close();
                            }else{
                                db.close();
                                console.log(err);
                            }
                        });
                    }else{
                        db.close();
                        console.log("error with remove fan");
                    }
                }
            );
        }else{
            console.log(err);
        }
    });
});

app.get("/posts", function(request, response){
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //find all ads in collection that have the screen id
            collection.find().toArray(function (err, data) {
                response.send({JSON : data});
            });
        }else{
            console.log(err);
        }
    });
});

app.get("/postswithcomments", function(request, response){
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            var data_to_sent = [];
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //find all ads in collection that have the screen id
            collection.find().toArray(function (err, data) {
                var length = data.length;
//FIXME need to fix the logic of send post with comments
                for(var i = 0 ;i<length;i++){
                    var post_data = data[i];
                    var collection_comments = db.collection('Comments');
                    collection_comments.find({_id : {$in : post_data.Comments}}).toArray(function (err,data){
                        post_data.Comments = data;
                        data_to_sent[i] = post_data;
                    })
                }
                response.send({JSON : data_to_sent});

            });
        }else{
            console.log(err);
        }
    });
});


//FIXME need to insert the post to the collection
app.post("/posts", function(request, response){
    console.log(request.body);
});

app.post("/comment", function(request, response){
    console.log(request.body);
});
app.get("/comments", function(request, response){
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Comments');
            //find all ads in collection that have the screen id
            collection.find().toArray(function (err, data) {
                response.send({JSON : data});
            });
        }else{
            console.log(err);
        }
    });
});

app.param('commentId', function(req, res, next, commentId) {
    // print  screenId to console
    console.log('commentId : ' + commentId);
    req.commentId = commentId;
    //check if we have more routes to do
    next();
});

app.delete("/comments=:commentId" , function(request, response){
    console.log(request.commentId);
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Users');
            //find the fan that need to update according the id and update the data
            collection.deleteOne(
                {"_id": new ObjectId(request.commentId)},
                function(err, results) {
                    if(!err){
                        console.log("remove fan success");
                        //find all ads in collection that have the screen id
                        collection.find().toArray(function (err, data) {
                            if(!err){
                                response.send({JSON : data});
                                db.close();
                            }else{
                                db.close();
                                console.log(err);
                            }
                        });
                    }else{
                        db.close();
                        console.log("error with remove fan");
                    }
                }
            );
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