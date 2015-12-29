/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('AdminCtrl', function($rootScope,$scope,$http, $route, $routeParams) {


    var postById = function(postId){
        for (var i=0;i<$scope.posts.length;i++){
            if($scope.posts[i]._id == postId ){
                //save the data from all page that use with this controller
                return $scope.posts[i];
            }
        }
        return null;
    }
    //get the posts from the DB
    $http({
        method: 'GET',
        url: '/posts'
    }).then(function successCallback(response) {
        $scope.posts = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get posts");
    });

    $scope.createPost = function(post){
        post.Release = new Date();
        $http({
            method: 'POST',
            url: '/posts',
            data: post
        }).then(function successCallback(response) {
            console.log("OK");
        }, function errorCallback(response) {
            console.log("ERROR");
        });
    }

    $scope.loadDetails = function(postId){
        $rootScope.postToEdit = postById(postId);
        if($rootScope.postToEdit != undefined ){
            window.location.href = "/#/Admin/Details"
        }else{
            window.location.href = "/#/Admin";
        }
    }


    $scope.upload = [];
    $scope.fileUploadObj = { testString1: "Test string 1", testString2: "Test string 2" };

    $scope.onFileSelect = function ($files) {
        //$files: an array of files selected, each file has name, size, and type.
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            (function (index) {
                $scope.upload[index] = $upload.upload({
                    url: "./api/files/upload", // webapi url
                    method: "POST",
                    data: { fileUploadObj: $scope.fileUploadObj },
                    file: $file
                }).progress(function (evt) {
                    // get upload percentage
                    console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    // file is uploaded successfully
                    console.log(data);
                }).error(function (data, status, headers, config) {
                    // file failed to upload
                    console.log(data);
                });
            })(i);
        }
    }

    $scope.abortUpload = function (index) {
        $scope.upload[index].abort();
    }



});
