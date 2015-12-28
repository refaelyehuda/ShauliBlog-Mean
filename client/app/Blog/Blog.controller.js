/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('BlogCtrl',function($rootScope,$scope,$http, $route, $routeParams) {

    $scope.posts = [];

    $http({
        method: 'GET',
        url: '/postswithcomments'
    }).then(function successCallback(response) {
        $scope.posts = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get posts");
    });


});