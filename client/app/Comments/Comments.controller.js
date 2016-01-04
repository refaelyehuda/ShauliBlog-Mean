/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('CommentsCtrl', function($rootScope,$scope,$http, $route, $routeParams) {

    var commentById = function(commentId){
        for (var i=0;i<$scope.comments.length;i++){
            if($scope.comments[i]._id == commentId ){
                //save the data from all page that use with this controller
                return $scope.comments[i];
            }
        }
        return null;
    }

    $http({
        method: 'GET',
        url: '/comments'
    }).then(function successCallback(response) {
        $scope.comments = response.data;
    }, function errorCallback(response) {
        console.log("error with  get comments");
    });

    $http({
        method: 'GET',
        url: '/posts'
    }).then(function successCallback(response) {
        $scope.posts = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get posts");
    });

    $scope.createComment = function(comment){
        comment.PostId = comment.PostId._id;
        comment.Release = new Date();
        $http({
            method: 'POST',
            url: '/comment',
            data: comment
        }).then(function successCallback(response) {
            console.log("OK");
            window.location.href = "/#/Comments";
        }, function errorCallback(response) {
            console.log("ERROR");
            window.location.href = "/#/Comments/create";
        });
    }
    $scope.loadDetails = function(commentId){
        $rootScope.commentToEdit = commentById(commentId);
        if($rootScope.commentToEdit != undefined ){
            window.location.href = "/#/Comments/details"
        }else{
            window.location.href = "/#/Comments/";
        }
    }

    $scope.deleteComment = function(commentId){
        $http({
            method: 'DELETE',
            url: '/comments' +"=" + commentId
        }).then(function successCallback(response) {
            $scope.comments = response.data;
            console.log("post deleted successfully");
        }, function errorCallback(response) {
            console.log("ERROR with deleted post");
        });
    }

});
