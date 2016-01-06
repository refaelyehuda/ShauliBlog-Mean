
angular.module('myApp').controller('BranchesCtrl', function($scope, $http) {

    $scope.name = "refael";

    var mapOptions = {
        center: new google.maps.LatLng(32.075548, 34.774229),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    //get the Branches from the DB
    $http({
        method: 'GET',
        url: '/locations'
    }).then(function successCallback(response) {
        $scope.locations = response.data;
        $scope.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
        for (var i=0;i<$scope.locations.length;i++ ){
            $scope.setMarkes($scope.map,$scope.locations[i]);
        }
    }, function errorCallback(response) {
        console.log("error with  get google maps locations");
    });

    //TODO Load data  points.
    //FIXME show just one point instead of show all the points

    $scope.setMarkes = function (map,data) {

        var myLatLng = new google.maps.LatLng(data.Latitude,data.Longitude);
        var marker = new google.maps.Marker({ position: myLatLng, map: map, title:data.Description});
    }

});