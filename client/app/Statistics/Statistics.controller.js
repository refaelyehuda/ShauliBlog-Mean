/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('myApp').controller('StatisticsCtrl', function($rootScope,$scope,$http, $route, $routeParams) {
    //get num of post per category
    $http({
        method: 'GET',
        url: '/categoryCount'
    }).then(function successCallback(response) {
        $scope.categories = response.data;
        //http://d3pie.org/
        $scope.pie = new d3pie("pieCategories", {
            "header": {
                "title": {
                    "text": "Category percentage",
                    "fontSize": 24,
                    "font": "open sans"
                },
                "subtitle": {
                    "text": "How meny post for each category",
                    "color": "#999999",
                    "fontSize": 12,
                    "font": "open sans"
                },
                "titleSubtitlePadding": 9
            },
            "footer": {
                "color": "#999999",
                "fontSize": 10,
                "font": "open sans",
                "location": "bottom-left"
            },
            "size": {
                "canvasWidth": 590,
                "pieOuterRadius": "87%"
            },
            "data": {
                "sortOrder": "value-desc",
                "content": $scope.categories
            },
            "labels": {
                "outer": {
                    "pieDistance": 32
                },
                "inner": {
                    "hideWhenLessThanPercentage": 3
                },
                "mainLabel": {
                    "fontSize": 11
                },
                "percentage": {
                    "color": "#ffffff",
                    "decimalPlaces": 0
                },
                "value": {
                    "color": "#adadad",
                    "fontSize": 11
                },
                "lines": {
                    "enabled": true
                },
                "truncation": {
                    "enabled": true
                }
            },
            "tooltips": {
                "enabled": true,
                "type": "placeholder",
                "string": "{label}: {value}, {percentage}%"
            },
            "effects": {
                "pullOutSegmentOnClick": {
                    "effect": "linear",
                    "speed": 400,
                    "size": 8
                }
            },
            "misc": {
                "gradient": {
                    "enabled": true,
                    "percentage": 100
                }
            },
            "callbacks": {
                "onMouseoverSegment": null,
                "onMouseoutSegment": null,
                "onClickSegment": null
            }
        });
    }, function errorCallback(response) {
        console.log("error with  get comments");
    });

    // get num of  post per author
    $http({
        method: 'GET',
        url: '/authorCount'
    }).then(function successCallback(response) {
        $scope.authors = response.data;
        //http://d3pie.org/
        $scope.pie2 = new d3pie("pieAuthor", {
            "header": {
                "title": {
                    "text": "Author percentage",
                    "fontSize": 34,
                    "font": "courier"
                },
                "subtitle": {
                    "text": "How meny post for each author",
                    "color": "#999999",
                    "fontSize": 10,
                    "font": "courier"
                },
                "location": "pie-center",
                "titleSubtitlePadding": 10
            },
            "footer": {
                "text": "* This was curious. We're not sure why over several people regard Winnipeg as a Top 15 Fear.",
                "color": "#999999",
                "fontSize": 10,
                "font": "open sans",
                "location": "bottom-left"
            },
            "size": {
                "canvasWidth": 590,
                "pieInnerRadius": "95%",
                "pieOuterRadius": "70%"
            },
            "data": {
                "sortOrder": "label-desc",
                "content":  $scope.authors
            },
            "labels": {
                "outer": {
                    "format": "label-percentage1",
                    "pieDistance": 20
                },
                "inner": {
                    "format": "none"
                },
                "mainLabel": {
                    "fontSize": 11
                },
                "percentage": {
                    "color": "#999999",
                    "fontSize": 11,
                    "decimalPlaces": 0
                },
                "value": {
                    "color": "#cccc43",
                    "fontSize": 11
                },
                "lines": {
                    "enabled": true,
                    "color": "#777777"
                },
                "truncation": {
                    "enabled": true
                }
            },
            "tooltips": {
                "enabled": true,
                "type": "placeholder",
                "string": "{label}: {value}, {percentage}%"
            },
            "effects": {
                "pullOutSegmentOnClick": {
                    "effect": "linear",
                    "speed": 400,
                    "size": 8
                }
            },
            "misc": {
                "colors": {
                    "segmentStroke": "#000000"
                }
            },
            "callbacks": {
                "onMouseoverSegment": null,
                "onMouseoutSegment": null,
                "onClickSegment": null
            }
        });
    }, function errorCallback(response) {
        console.log("error with  get comments");
    });

});
