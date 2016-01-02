/**
 * Created by refael yehuda on 1/1/2016.
 */
/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('CommentPerPostCtrl', function($rootScope,$scope,$http,$location, $route, $routeParams) {
    var postId = $routeParams.postId;
        $http({
            method: 'GET',
            url: '/commentPerPost' +"=" + postId
        }).then(function successCallback(response) {
            $scope.commentPerPost = response.data;
            console.log("get comment per post");
        }, function errorCallback(response) {
            console.log("ERROR with deleted post");
        });

});
