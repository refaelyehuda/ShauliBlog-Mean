
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
        for (var i=0;i<$scope.locations.JSON.length;i++ ){
            $scope.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
            $scope.setMarkes($scope.map,$scope.locations.JSON[i]);
        }
    }, function errorCallback(response) {
        console.log("error with  get google maps locations");
    });

    //TODO Load data  points.
    //FIXME show just one point instead of show all the points

    $scope.setMarkes = function (map,data) {

        var myLatLng = new google.maps.LatLng(data.Latitude,data.Longitude);
        var marker = new google.maps.Marker({ position: myLatLng, map: map, title:data.Description});

         //myLatLng = new google.maps.LatLng('31.77723', '35.22644');
         //marker = new google.maps.Marker({ position: myLatLng, map: map, title: 'In the city center' });
         //
         //
         //myLatLng = new google.maps.LatLng('31.99095', '34.77131');
         //marker = new google.maps.Marker({ position: myLatLng, map: map, title: 'Industrial Area' });
    }

});