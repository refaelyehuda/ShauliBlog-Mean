/**
 * Created by refael yehuda on 12/30/2015.
 */
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient , format = require('util').format;

var mongo  = {
    //the status of the functions
    success : 1 ,
    error : -1 ,
    insertPost : function insertPost(collection , post,callback){
        collection.insertOne(post
        ,function(err, records){
            if(!err){
                console.log("Record added successfully");
                callback(mongo.success);
                //response.send("OK");
            }else{
                callback(mongo.error);
            }

        });
    },
    findPost : function(collection , postId,callback){
        collection.find(
            {"_id": new ObjectId(postId)}).toArray(
            function(err, results) {
                if(!err){
                    console.log("find post success");
                    callback(mongo.success ,results );
                }else{
                    console.log("error with find post");
                    callback(mongo.error);
                }
            }
        );
    },
    updatePost :function(collection , post,callback){
        var status;
        var postId = post._id;
        //delete the post id that generate by mongo and not need to change
        delete post._id;
            collection.updateOne(
                { _id : new ObjectId(postId) },
                {
                    $set: post,
                }, function(err, results) {
                    if(!err){
                        console.log("update post success");
                        status = mongo.success;
                        callback(status);
                    }else{
                        console.log("error with update post");
                        status = mongo.error;
                        callback(status);
                    }
                });
    },
    insertComment : function(collection , comment,callback){
        //FIXME need to add userID
        collection.insertOne(comment
        ,function(err, comment){
            if(!err){
                console.log(comment._id);
                console.log("Record added successfully");
                callback(mongo.success);
                //response.send("OK");
            }else{
                callback(mongo.error);
            }

        });
    }

}

module.exports = mongo;