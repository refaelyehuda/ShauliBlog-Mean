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
        .when('/FanClubs',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/FanClubs.html'

            })
        .when('/FanClubs/edit',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/editFans.html'

            })
        .when('/FanClubs/details',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/detailsFans.html'

            })
        .when('/Admin',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/Admin.html'

            })
        .when('/Branches',
            {
                controller: 'BranchesCtrl',
                templateUrl: '/app/Branches/Branches.html'

            })
        .otherwise({redirectTo:'/'});
}]);