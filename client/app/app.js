/**
 * Created by refael yehuda on 12/23/2015.
 */
'use strict'
var app = angular.module('myApp', ['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',
            {
                controller: 'BlogCtrl',
                templateUrl: '/app/Blog/Blog.html'

            })

        .when('/ErrorComment',
            {
                controller: 'BlogCtrl',
                templateUrl: '/app/Blog/ErrorComment.html'

            })
        .when('/FanClubs',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/FanClubs.html'

            })
        .when('/FanClubs/edit',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/EditFans.html'

            })
        .when('/FanClubs/details',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/DetailsFans.html'

            })
        .when('/FanClubs/GroupFansByBirthdate',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/GroupFansByBirthdate.html'

            })
        .when('/FanClubs/GroupFansByGender',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/GroupFansByGender.html'

            })
        .when('/Admin',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/Admin.html'

            })
        .when('/Admin/CreatePost',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/CreatePost.html'

            })
        .when('/Admin/edit',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/EditPost.html'

            })
        .when('/Admin/Details',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/DetailsPost.html'

            })
        .when('/Admin/CommentsPerPost/:postId',
            {
                controller: 'CommentPerPostCtrl',
                templateUrl: '/app/Admin/CommentsPerPost.html'

            })
        .when('/Branches',
            {
                controller: 'BranchesCtrl',
                templateUrl: '/app/Branches/Branches.html'

            })
        .when('/Comments',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/Comments.html'
            })
        .when('/Comments/create',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/CreateComment.html'

            })
        .when('/Comments/edit',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/EditComment.html'

            })
        .when('/Comments/details',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/DetailsComment.html'

            })
        .when('/Statistics',
            {
                controller: 'StatisticsCtrl',
                templateUrl: '/app/Statistics/index.html'

            })
        .otherwise({redirectTo:'/'});
}]);

angular.module('myApp').controller('RootCtrl',function($rootScope,$scope,$http, $route, $routeParams) {

    $scope.news = [];
    $scope.socket = io();
    $scope.socket.on('news_update', function(msg){
        console.log(msg.data);
        $scope.news = msg.data;
        $scope.$apply();
    });

});