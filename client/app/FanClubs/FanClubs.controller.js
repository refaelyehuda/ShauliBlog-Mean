/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('FanClubsCtrl',function($rootScope,$scope,$http, $route, $routeParams) {

    //FIXME need to fix search by birthday
    var fanById = function(fanId){
        for (var i=0;i<$scope.fansclubs.length;i++){
            if($scope.fansclubs[i]._id == fanId ){
                //save the data from all page that use with this controller
                return $scope.fansclubs[i];
            }
        }
        return null;
    }
    //get the fans from the DB
    $http({
        method: 'GET',
        url: '/fans'
    }).then(function successCallback(response) {
        $scope.fansclubs = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get fans");
    });
    $scope.loadEdit = function(fanId){
        $rootScope.fanToEdit = fanById(fanId);
        if($rootScope.fanToEdit != undefined ){
            window.location.href = "/#/FanClubs/edit"
        }else{
            window.location.href = "/#/FanClubs";
        }

    }
    $scope.UpdatesFans = function(fan){
        console.log(fan);
        $http({
            method: 'PUT',
            url: '/fans',
            data: fan
        }).then(function successCallback(response) {
            console.log("OK");
        }, function errorCallback(response) {
            console.log("ERROR");
        });
    }
    $scope.loadDetails = function(fanId){
        $rootScope.fanToEdit = fanById(fanId);
        if($rootScope.fanToEdit != undefined ){
            window.location.href = "/#/FanClubs/details"
        }else{
            window.location.href = "/#/FanClubs";
        }
    }
    $scope.deleteFan = function(fanId){
        var fanToDelete = fanById(fanId);
        if(fanToDelete.Role != "admin"){
            window.location.href="/#/FanClubs/";
        }else{
            $http({
                method: 'DELETE',
                url: '/fans' +"=" + fanId
            }).then(function successCallback(response) {
                $scope.fansclubs = response.data.JSON;
                console.log("fan deleted successfully");
            }, function errorCallback(response) {
                console.log("ERROR with deleted fan");
            });
        }

    }
    $scope.groupByYear = function(){

        $http({
            method: 'GET',
            url: '/groupFansByYear'
        }).then(function successCallback(response) {
            $rootScope.groupFans = response.data;
            $rootScope.groupFans.forEach(function (year) {
                console.log(year.count);
                console.log(year._id.Birthdate);
            })
            window.location.href = "/#/FanClubs/GroupFansByBirthdate"
        }, function errorCallback(response) {
            console.log("error with  get fans");
            window.location.href = "/#/FanClubs";
        });
    }

    $scope.groupByGender = function(){

        $http({
            method: 'GET',
            url: '/groupFansByGender'
        }).then(function successCallback(response) {
            $rootScope.groupFans = response.data;
            $rootScope.groupFans.forEach(function (year) {
                console.log(year.count);
                console.log(year._id.Birthdate);
            })
            window.location.href = "/#/FanClubs/GroupFansByGender"
        }, function errorCallback(response) {
            console.log("error with  get fans");
            window.location.href = "/#/FanClubs";
        });
    }

    /**
     * send the search request to the server
     */
    $scope.searchFans = function(search){
        if(!search.FirstName){
            delete search.Firstname
        }
        if(!search.Gender){
            delete search.Gender
        }
        if(!search.Birthdate){
            delete search.Birthdate
        }

        /**
         * send the search request to the server
         */
        $http({
            method:'POST',
            url: '/searchFans',
            data: search
        }).then(function successCallback(response) {
            $scope.fansclubs = response.data;
        }, function errorCallback(response) {
            console.log("error with  search fans");
        });
    }
});