/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('FanClubsCtrl',function($rootScope,$scope,$http, $route, $routeParams) {

    //FIXME need to fix search by birthday
    //get the fans from the DB
    $http({
        method: 'GET',
        url: '/fansclub'
    }).then(function successCallback(response) {
        $scope.fansclubs = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get fans");
    });

    $scope.loadEdit = function(fanId){
        for (var i=0;i<$scope.fansclubs.length;i++){
            if($scope.fansclubs[i]._id == fanId ){
                //save the data from all page that use with this controller
                $rootScope.fanToEdit = $scope.fansclubs[i];
            }
        }
        window.location.href = "/#/FanClubs/edit"
    }


});