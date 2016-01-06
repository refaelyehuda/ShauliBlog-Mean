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
var mongoQuery = require('./mongoController/mongoQueries');
var FB = require('fb');

var app = express();
var router = express.Router();


router.use(logger());
app.use(bodyParser.json());
router.use(express.static(__dirname + '/../client'));

app.use('/', router);
//root
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
            response.send(data);
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

app.get("/groupFansByYear",function(request, response){
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Users');
            //group by Birthdate og the fans
            collection.aggregate(   [ { $group : { _id : { Birthdate: "$Birthdate" },count: { $sum: 1
            }}}]).toArray(function(err, result) {
                response.send(result);
            });

        }else{
            console.log(err);
        }
    });


});

app.get("/groupFansByGender",function(request, response){
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Users');
            //group by Birthdate og the fans
            //aggregate(   [ { $group : { _id : { Birthdate: "$Birthdate" },count: { $sum: 1 }}}
            collection.aggregate(   [ { $group : { _id : { Gender: "$Gender" },count: { $sum: 1
            }}}]).toArray(function(err, result) {
                response.send(result);
            });

        }else{
            console.log(err);
        }
    });


});

app.put("/fans", function(request, response){
    var fanId = request.body._id;
    var fanToUpdates = request.body;
    delete fanToUpdates._id;
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Users');
            //find the fan that need to update according the id and update the data
            collection.updateOne(
                { "_id" : new ObjectId(fanId) },
                {
                    $set: fanToUpdates,
                    $currentDate: { "lastModified": true }
                }, function(err, results) {
                    if(!err){
                        console.log("update fan success");
                        db.close();
                        response.send("The fan is updated");
                    }else{
                        db.close();
                        console.log("error with update fan");
                        response.send("Error with update fan ");
                    }

                });
        }else{
            console.log(err);
        }
    });
});

//get the screenId that entered to delete
app.param('fanId', function(req, res, next, fanId) {
    // print  screenId to console
    console.log('fanId : ' + fanId);
    req.fanId = fanId;
    //check if we have more routes to do
    next();
});
//delte fan by id
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
                                db.close();
                                response.send({JSON : data});
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
//get all post
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
//get all post with comment of all post
app.get("/postsWithComments", function(request, response){
    // Connect to the db
    var lengthObject = { length: 0 };
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            var data_to_sent = [];
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //find all ads in collection that have the screen id
            collection.find().toArray(function (err, data) {
                lengthObject.length = data.length;
                data.forEach(function(post_data){
                    var collection_comments = db.collection('Comments');
                        collection_comments.find({_id : {$in : post_data.Comments}}).toArray(function (err,comments){
                            post_data.Comments = comments;
                            lengthObject.length --;
                            if(lengthObject.length == 0){
                                response.send(data);
                            }
                        })
                })
            });
        }else{
            console.log(err);
        }
    });
});
// get cooments per post
app.get("/commentPerPost=:postId", function(request, response){
    var postId =request.postId;
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //find all ads in collection that have the screen id
            collection.find({ "_id" : new ObjectId(postId)}).toArray(function (err, data) {
                if(!err){
                    var collection_comments = db.collection('Comments');
                    collection_comments.find({_id : {$in : data[0].Comments}}).toArray(function (err,comments){
                        if(!err){
                            console.log("Get the comment per post ")
                            response.send(comments);
                            db.close();
                        }else{
                            console.log("Error with  Get the comment per post ")
                        }

                    })
                }else{
                    console.log("Error with  Find  post ")
                }


            });
        }else{
            console.log(err);
        }
    });

});
// send category and num of record with this category to the client for display graph
app.get("/categoryCount", function(request, response){
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //group by Birthdate og the fans
            collection.aggregate(   [ { $group : { _id : { label: "$Category" },value: { $sum: 1
            }}}]).toArray(function(err, result) {
                var dataToSend =[];
                var index = 0;
                result.forEach(function (data) {
                    var temp = {label:data._id.label,value : data.value};
                    dataToSend.push (temp);
                    //dataToSend[index].label=data._id.label;
                    //dataToSend[index].value = data.value;
                    index++;
                    if(dataToSend.length == result.length){
                        response.send(dataToSend);
                    }
                })
            });
/*
 {
 "label": "FoxPro",
 "value": 32170,
 "color": "#248838"
 }
 */
        }else{
            console.log(err);
        }
    });
});
// send author and num of record of this author to the client for display graph
app.get("/authorCount", function(request, response){
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //group by Birthdate og the fans
            collection.aggregate(   [ { $group : { _id : { label: "$Author" },value: { $sum: 1
            }}}]).toArray(function(err, result) {
                var dataToSend =[];
                var index = 0;
                result.forEach(function (data) {
                    //create the structure of the d3 library to show pie
                    var temp = {label:data._id.label,value : data.value};
                    dataToSend.push (temp);
                    index++;
                    if(dataToSend.length == result.length){
                        response.send(dataToSend);
                    }
                })
            });
            /*
             {
             "label": "FoxPro",
             "value": 32170,
             "color": "#248838"
             }
             */
        }else{
            console.log(err);
        }
    });
});
//Create post
app.post("/posts", function(request, response){
    var success = 1;
    var post =request.body;
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //find all ads in collection that have the screen id
            mongoQuery.insertPost(collection,post,function(status){
                if(status == success ){
                    db.close();
                    send_update();
                    response.send("OK");
                }else{
                    db.close();
                    response.send("Error");
                }

            });


        }else{
            console.log(err);
        }
    });
});
//update post
app.put("/posts", function(request, response){
    var success = 1;
    var post =request.body;
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //find all ads in collection that have the screen id

                mongoQuery.updatePost(collection,post,function(status){
                    if(status == success ){
                        db.close();
                        send_update();
                        response.send("OK");
                    }else{
                        db.close();
                        response.send("Error");
                    }

                });

        }else{
            console.log(err);
        }
    });

});

app.param('postId', function(req, res, next, postId) {
    // print  screenId to console
    console.log('postId : ' + postId);
    req.postId = postId;
    //check if we have more routes to do
    next();
});

app.delete("/posts=:postId" , function(request, response){
    console.log(request.postId);
    var success = 1;
    var postId =request.postId;
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection Posts
            var collection = db.collection('Posts');
            //find the post that we want to delete
            collection.find({"_id": new ObjectId(postId)}).toArray(function(err,data){
                if(!err){
                    var collection_comments = db.collection('Comments');
                    //remove all comments of this post from the Comments collection
                    collection_comments.deleteMany({_id : {$in : data[0].Comments}},function (err,result){
                        if(!err){
                            console.log("delete all comments per postId : "+postId );
                            //delete the post by ID
                            collection.deleteOne(
                                {"_id": new ObjectId(postId)},
                                function(err, results) {
                                    if(!err){
                                        console.log("remove post success");
                                        //Get the update collection
                                        collection.find().toArray(function (err, data) {
                                            if(!err){
                                                db.close();
                                                //send the update collection to the client
                                                response.send(data);
                                            }else{
                                                db.close();
                                                console.log(err);
                                            }
                                        });
                                    }else{
                                        db.close();
                                        console.log("error with remove post");
                                    }
                                }
                            );
                        }else{
                            console.log("Erro with delete all comments per postId : "+postId );
                        }
                    })
                }else{
                    console.log("Error with get post by post id");
                }
            })
        }else{
            console.log(err);
        }
    });
});

app.post("/comment", function(request, response){
    var success = 1;
    var comment =request.body;
    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Comments');
            //find all ads in collection that have the screen id
            mongoQuery.insertComment(collection,comment,function(status){
                if(status == success ){
                    //update the post with the new comment
                    var collection_post = db.collection('Posts');
                    collection_post.updateOne(
                        { "_id" : new ObjectId(comment.PostId) },
                        {
                            $push: {"Comments":comment._id},
                            $currentDate: { "lastModified": true }
                        },function(err, records){
                            if(!err){
                                console.log("comment added successfully");
                                response.send("OK");
                                db.close();
                            }else{
                                console.log("Error with add commentId to post  ");
                            }

                        });
                }else{
                    response.send("Error");
                    db.close();
                }

            });


        }else{
            console.log(err);
        }
    });
});
app.get("/comments", function(request, response){
    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Comments');
            //find all ads in collection that have the screen id
            collection.find().toArray(function (err, data) {
                response.send(data);
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
            var collection = db.collection('Comments');
            //find the fan that need to update according the id and update the data
            collection.deleteOne(
                {"_id": new ObjectId(request.commentId)},
                function(err, results) {
                    if(!err){
                        console.log("remove comment success");
                        //find all ads in collection that have the screen id
                        collection.find().toArray(function (err, data) {
                            if(!err){
                                response.send(data);
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

//This will sent the last 4 posts to all of the connected clients.
var send_update = function () {

    MongoClient.connect("mongodb://localhost:27017/Shauli", function (err, db) {
        if (!err) {
            console.log("Connection to MongoDb established");
            // Fetch the collection ads
            var collection = db.collection('Posts');
            //find four newest post
            collection.find().sort( { Release: -1 } ).limit(4).toArray(function (err, data) {
                //response.send({JSON : data});
                var msg = {type: "new_post",data:data}
                io.emit('news_update',msg);
                console.log ('sent ' + msg);
            });
        }else{
            console.log(err);
        }
    });
};


var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('user connected');
    send_update();
});