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
        console.log("error with  get fans");
    });

    $scope.createPost = function(post){
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
});
