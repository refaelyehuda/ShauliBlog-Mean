/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('admin').controller('AdminCtrl', function($rootScope,$scope,$http,$location, $route, $routeParams) {

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
        post.Comments = [];
        $http({
            method: 'POST',
            url: '/posts',
            data: post
        }).then(function successCallback(response) {

            console.log("OK");
            window.location.href = "/#/Admin";
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
    $scope.loadEdit = function(postId){
        $rootScope.postToEdit = postById(postId);
        if($rootScope.postToEdit != undefined ){
            window.location.href = "/#/Admin/edit"
        }else{
            window.location.href = "/#/Admin";
        }

    }
    $scope.updatesPost = function(post){
        $http({
            method: 'PUT',
            url: '/posts',
            data: post
        }).then(function successCallback(response) {
            console.log("OK");
            window.location.href = "/#/Admin";
        }, function errorCallback(response) {
            console.log("ERROR");
            window.location.href = "/#/Admin/edit"
        });
    }

    $scope.deletePost = function(postId){
        $http({
            method: 'DELETE',
            url: '/posts' +"=" + postId
        }).then(function successCallback(response) {
            $scope.posts = response.data;
            console.log("post deleted successfully");
        }, function errorCallback(response) {
            console.log("ERROR with deleted post");
        });
    }

    $scope.commentPerPost = function(postId){
        window.location.href = "/#/Admin/CommentsPerPost/"+postId;
    }
});
