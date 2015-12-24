
angular.module('myApp').controller('BranchesCtrl', function($scope, $http) {

    $scope.name = "refael";
    var mapOptions = {
        center: new google.maps.LatLng(32.075548, 34.774229),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    $scope.map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    //TODO Load data  points.

    $scope.setMarkes = function (map) {

        var myLatLng = new google.maps.LatLng('32.06363', '34.77623');
        var marker = new google.maps.Marker({ position: myLatLng, map: map, title: 'Tel Aviv Fans' });


        var myLatLng = new google.maps.LatLng('31.77723', '35.22644');
        var marker = new google.maps.Marker({ position: myLatLng, map: map, title: 'In the city center' });


        var myLatLng = new google.maps.LatLng('31.99095', '34.77131');
        var marker = new google.maps.Marker({ position: myLatLng, map: map, title: 'Industrial Area' });


    }
    $scope.setMarkes($scope.map);


});