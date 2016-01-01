/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('BlogCtrl',function($rootScope,$scope,$http, $route, $routeParams) {

    $scope.posts = [];

    $http({
        method: 'GET',
        url: '/postsWithComments'
    }).then(function successCallback(response) {
        $scope.posts = response.data;
    }, function errorCallback(response) {
        console.log("error with  get posts");
    });

    $scope.createComment = function(comment,post){
        comment.PostId = post._id;
        comment.Release = new Date();
        $http({
            method: 'POST',
            url: '/comment',
            data: comment
        }).then(function successCallback(response) {
            console.log("OK");
            $http({
                method: 'GET',
                url: '/postsWithComments'
            }).then(function successCallback(response) {
                $scope.posts = response.data;
            }, function errorCallback(response) {
                console.log("error with  get posts");
            });
        }, function errorCallback(response) {
            console.log("ERROR");
            window.location.href = "/#/ErrorComment";
        });
    }
});