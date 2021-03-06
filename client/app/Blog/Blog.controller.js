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
    /**
     * create a comment
     * @param comment
     * @param post
     */
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
    /**
     * send to server the search parameters to filter with
     * @param search
     */
    $scope.searchPost = function(search){
        /**
         * check if there are arguments that are not  chosen
         */
        if(!search.fromDate){
           delete search.fromDate
        }
        if(!search.toDate){
            delete search.toDate;
        }
        if(!search.Category){
           delete search.Category;
        }
        if(!search.Author){
           delete search.Author;
        }
        if(!search.Title){
           delete search.Title;
        }

        /**
         * send the search request to the server
         */
        $http({
            method:'POST',
            url: '/searchPost',
            data: search
        }).then(function successCallback(response) {
            $scope.posts = response.data;
        }, function errorCallback(response) {
            console.log("error with  get posts");
        });

    }
});