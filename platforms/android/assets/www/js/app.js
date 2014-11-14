'use strict';
var BkpkApp = angular.module('BkpkApp', ['ionic']);
var myUrl, thisCity, idCity;
var myCities = [];
var cityName;
var markedCities = [];
var citiesCalc = [];
var myReview;
var citiesReviews = [];
/**
 * Routing table including associated controllers.
 */
BkpkApp.run(function($state) {
    //    if (window.localStorage['apiKey'] == 'null' || window.localStorage['apiKey'] == null || window.localStorage['apiKey'] == "") {
    //        console.log("ta vazio");
    ////        alert("empty red");
    //        //		   $state.go('app.login');
    //        window.location.href = '#/app/login';
    //    } else {
    //        console.log(window.localStorage['apiKey']);
    ////        alert(window.localStorage['apiKey']);
    //    }
});
BkpkApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: "/app",
            abstract: true,
            templateUrl: "pages/menu.html"
        })
        .state('app.home', {
            url: '/home',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appHome.html',
                    controller: 'MainCtrl'
                }
            }
        })
        .state('app.map', {
            url: '/map',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appMap.html',
                    controller: 'GpsCtrl'
                }
            }
        })
        .state('app.reviews', {
            url: '/reviews',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appReviews.html',
                    controller: 'ReviewCtrl'
                }
            }
        }).state('app.login', {
            url: '/login',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appLogin.html',
                    controller: 'LoginCtrl'
                }
            }
        })
        .state('app.wishlist', {
            url: '/wishlist',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appWishlist.html',
                    controller: 'WiLiCtrl'
                }
            }
        })
        .state('app.myWish', {
            url: '/myWish',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appMyWishlist.html',
                    controller: 'MyWishCtrl'
                }
            }
        })
        .state('app.list', {
            url: '/list',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appList.html',
                    controller: 'ListCtrl'
                }
            }
        })
        .state('app.trips', {
            url: '/trips',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appTrips.html',
                    controller: 'MainCtrl'
                }
            }
        }).state('app.city', {
            url: '/city',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appCityInfo.html',
                    controller: 'CityCtrl'
                }
            }
        })
        .state('app.cityRv', {
            url: '/cityRv',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appCityInfoReview.html',
                    controller: 'CityCtrlRV'
                }
            }
        })
        .state('app.calc', {
            url: '/calc',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appMapCalc.html',
                    controller: 'CalcCtrl'
                }
            }
        })
        .state('app.register', {
            url: '/register',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appRegister.html',
                    controller: 'RegisterCtrl'
                }
            }
        })
        .state('app.logout', {
            url: '/logout',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appLogout.html',
                    controller: 'LogoutCtrl'
                }
            }
        })
	.state('app.createReview', {
            url: '/createReview',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appCreateReview.html',
                    controller: 'CreateReviewCtrl'
                }
            }
        })
        .state('app.profile', {
            url: '/profile',
            views: {
                'menuContent': {
                    templateUrl: 'pages/appProfile.html',
                    controller: 'ProfileCtrl'
                }
            }
        });


    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/home');
}]);



BkpkApp.controller("WiLiCtrl", function($scope, $http) {
    var result;

    $scope.search = function() {
        if ($scope.city == null || $scope.country == null) {
            if ($scope.city == null) {
                document.getElementById("ckeck1").className = "icon ion-close-round";
            }



            if ($scope.country == null) {
                document.getElementById("ckeck2").className = "icon ion-close-round";
            }
        } else {
            document.getElementById("ckeck1").className = "icon ion-checkmark-round";
            document.getElementById("ckeck2").className = "icon ion-checkmark-round";
            var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/search?params[][name]=';
            var cidade = $scope.city;
            var pais = $scope.country;
            var continent = $scope.continent;
            //			$http.get('http://backpackers-vsnetwork.rhcloud.com/api/v1/city/search?params[][name]=dublin').then(function(resp) {
            console.log(url + cidade + "&params[][country_name]=" + pais + "&params[][continent]=" + continent);
            myUrl = url + cidade + "&params[][country_name]=" + pais + "&params[][continent]=" + continent + "&api_key=" + window.localStorage['apiKey'];
            //$http.get(url+cidade+"&params[][country_name]="+pais+"&params[][continent]="+continent).success(function(data) {
            //	console.log(data);	
            //	console.log(data.result[1]);
            //	$scope.label=data.result[1];
            //	result  = data.result;
            //	console.log(result);
            ////	$state.go('app.list');
            window.location.href = '#/app/list';
            //});

        }

    }
});
BkpkApp.controller('ListCtrl', function($scope, $http) {
    $http.get(myUrl).success(function(data) {
        if (data.totalNumberOfItems > 0) {
            $scope.cities = data.result;
        } else {
            $scope.error = "No records found";
        }

    });
    $scope.cityInfo = function(id) {
        console.log("citiinfo");
        idCity = id;
        window.location.href = '#/app/city';
    }
});


BkpkApp.controller('LogoutCtrl', function($scope, $interval) {
    $scope.logout = $interval(function() {
        console.log("logout");
        window.localStorage['apiKey'] = null;
        window.location.href = '#/app/login';
    }, 9000, 2, false);


});


BkpkApp.controller('ProfileCtrl', function($scope, $http) {
    $scope.sport = 0;
    $scope.adventure = 0;
    $scope.art_and_culture = 0;
    $scope.entertainment = 0;
    $scope.landscape = 0;
    $scope.urban = 0;
    $scope.about= window.localStorage['apiKey'];
 	$scope.save = function(){
			var params = { "params" : { "sport" : $scope.sport, "adventure" : $scope.adventure, "art_and_culture" : $scope.art_and_culture, "entertainment" : $scope.entertainment, "landscape" : $scope.landscape, "urban" : $scope.urban }}

		console.log(window.localStorage['apiKey']);
		console.log(params);
		 $http.post('http://backpackers-vsnetwork.rhcloud.com/api/v1/preference?api_key='+window.localStorage['apiKey'], params
            ).
            success(function(data) {
                console.log(data.status);
			 console.log(data);
                if (data.status == 'OK') {
					alert("Preferences saved");
					console.log(data.result);
                } 

            });
	}

});



BkpkApp.controller('CalcCtrl', function($scope, $http) {
    var calcCidades = [];
    markedCities = [];
    for (var i = 0; i < markedCities.length; i++) {
        var isB = false;
        var cidade, pais;
        console.log(markedCities[i].position.lat(), markedCities[i].position.lng());
        var url = "http://backpackers-vsnetwork.rhcloud.com/api/v1/city/closest?api_key=" + window.localStorage['apiKey'] + "&params[latitude]=" + markedCities[i].position.lat() + "&params[longitude]=" + markedCities[i].position.lng() + "&sensor=true";

        $http.get(url).success(function(data) {
            console.log(data.result);
            calcCidades.push(data.result[0]);

        });
    }

    console.log(calcCidades);

    $scope.markedCities = calcCidades;

});




BkpkApp.controller('CityCtrl', function($scope, $http) {
    var name;
    var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/' + idCity + '?api_key=' + window.localStorage['apiKey'];
    console.log(url);
    $http.get(url).success(function(data) {
        $scope.city = data.result;
        thisCity = $scope.city;
        $scope.add = "";
        //		 console.log(data.result);
        //		 		 console.log(data.result.name);
        //		 name = data.result.name;
        //		 $scope.nome =  data.result.name;
        //		 console.log(name);

    })
});

BkpkApp.controller('CityCtrlRV', function($scope, $http) {
    var end;
    var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/' + idCity + '?api_key=' + window.localStorage['apiKey'];
    $http.get(url).success(function(data) {
        $scope.city = data.result;
        thisCity = $scope.city;
        $scope.add = "";

    });

    for (var x = 0; x < citiesReviews.length; x++) {
        if (citiesReviews[x].id_city == idCity) {
            end = citiesReviews[x].stars;
        }
    }
    var star = "<i class='icon ion-star'></i> ";
    var final = "My Review: ";
    for (var i = 0; i < end; i++) {
        final += star;
    }
    $scope.rev = final;


});
BkpkApp.controller('MyWishCtrl', function($scope, $http) {
    //    $scope.cities = myCities;

    if (myCities.length > 0) {
        $scope.cities = myCities;
    } else {
        $scope.error = "No records found";
    }

    $scope.cityInfo = function(id) {
        console.log("citiinfo");
        idCity = id;
        window.location.href = '#/app/city';
    }

});

BkpkApp.controller('LoginCtrl', function($scope, $http) {
    $scope.login = function() {
        if ($scope.user == null || $scope.pass == null) {
            if ($scope.user == null) {
                document.getElementById("ckeck1").className = "icon ion-close-round";
            }



            if ($scope.pass == null) {
                document.getElementById("ckeck2").className = "icon ion-close-round";
            }
        } else {
            //			console.log($scope.user+" - "+$scope.pass);
            $http.post('http://backpackers-vsnetwork.rhcloud.com/api/v1/user/authenticate', {
                'params': {
                    'username': $scope.user,
                    'password': $scope.pass
                }
            }).
            success(function(data) {
                console.log(data.status);
                if (data.status == 'OK') {
                    window.localStorage['apiKey'] = data.result.api_key;
                    window.location.href = '#/app/home';
                } else {
                    $scope.label = "Username or Password incorrect";
                }

            });
        }
    }

});

BkpkApp.controller('HeaderCtrl', function($scope) {
    if (window.localStorage['apiKey'] == 'null' || window.localStorage['apiKey'] == null || window.localStorage['apiKey'] == "") {
        console.log("ta vazio");
        // alert("empty red");
        //		   $state.go('app.login');
        window.location.href = '#/app/login';
    } else {
        //    	   	console.log(window.localStorage['apiKey']);
        //    	   alert(window.localStorage['apiKey']);
    }
    //console.log();
    // Main app controller, empty for the example
    $scope.leftButtons = [{
        type: 'button-clear',
        content: '<i class="icon ion-navicon"></i>',
        tap: function(e) {
            $scope.sideMenuController.toggleLeft();
        }
    }];
    $scope.addRighButtons = [{
        type: 'button-small',
        content: '<i class="icon ion-plus-round"></i>',
        tap: function(e) {
            $scope.sideMenuController.toggleRight();
            var sizeAf = myCities.length;
            console.log(thisCity);
            myCities.push(thisCity);
            console.log(myCities);
            alert("City added to your wish list");

        }
    }];
	
    $scope.wishButtons = [{
        type: 'button-small',
        content: '<i class="icon ion-star"></i>',
        tap: function(e) {
            $scope.sideMenuController.toggleRight();
            window.location.href = '#/app/myWish'
            for (var i = 0; i < myCities.length; i++) {
                console.log(myCities[i]);
            }
        }
    }];
	
	  $scope.reviewButtons = [{
        type: 'button-small',
        content: '<i class="icon ion-plus-round"></i>',
        tap: function(e) {
            $scope.sideMenuController.toggleRight();
            window.location.href = '#/app/createReview'
        }
    }];
});
/**
 * MAIN CONTROLLER - handle inapp browser
 */
BkpkApp.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

    var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/search?params[][continent]=europe&params[][name]=fl&maxItems=7&api_key=' + window.localStorage['apiKey'];

    $http.get(url).success(function(data) {
        $scope.cities = data.result;
    });


    $scope.cityInfo = function(id) {
        idCity = id;
        window.location.href = '#/app/city'
    }

}]);


BkpkApp.controller('RegisterCtrl', ['$scope', '$http', '$interval', function($scope, $http, $interval) {

    $scope.register = function() {
        console.log("Email " + $scope.email);
        console.log("Username " + $scope.user);
        console.log("Password " + $scope.pass);

		console.log("Calling server..");
        $http.post('http://backpackers-vsnetwork.rhcloud.com/api/v1/user', {
                 "params": {
                    "name": $scope.user,
                    "username": $scope.user,
                    "password": $scope.pass,
                    "email": $scope.email
                }
            }
        ).
    success(function(data) {
        console.log(data);
			console.log(data.status);
        if (data.status == 'OK') {
        
			console.log(data);
            console.log(data.result);
			window.localStorage['apiKey'] = data.result.api_key;
			console.log("API key: "+window.localStorage['apiKey']);
			$scope.register = $interval(function() {
					console.log("registrado");
					window.location.href = '#/app/home';
				}, 2000, 2, false);
        } else {
            $scope.label = "Sorry something wrong happened, try again.";
        }
console.log("Close server..");
    });


}


}]);




BkpkApp.controller('ReviewCtrl', ['$scope', '$http', function($scope, $http) {
    var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/reviews?api_key=' + window.localStorage['apiKey'];
    $http.get(url).success(function(data) {
        $scope.citiesReviews = data.result;
        citiesReviews = data.result;
    });


    $scope.cityInfo = function(id) {
        idCity = id;
        window.location.href = '#/app/cityRv';
    }

}]);


BkpkApp.controller('CreateReviewCtrl', ['$scope', '$http', function($scope, $http) {
 $scope.search = function() {
        if ($scope.city == null || $scope.country == null) {
//			console.log("null");
            if ($scope.city == null) {
                document.getElementById("ckeck1").className = "icon ion-close-round";
            }



            if ($scope.country == null) {
                document.getElementById("ckeck2").className = "icon ion-close-round";
            }
        } else {
//			console.log("notnull");
            document.getElementById("ckeck1").className = "icon ion-checkmark-round";
            document.getElementById("ckeck2").className = "icon ion-checkmark-round";
//			console.log($scope.city+" - "+$scope.country+" - "+$scope.continent);
            var url = 'http://backpackers-vsnetwork.rhcloud.com/api/v1/city/search?params[][name]=';
            var cidade = $scope.city;
            var pais = $scope.country;
            var continent = $scope.continent;
            var thisUrl = url + cidade + "&params[][country_name]=" + pais + "&params[][continent]=" + continent + "&api_key=" + window.localStorage['apiKey'];
 $http.get(thisUrl).success(function(data) {
        $scope.searchCities = data.result;
	 
	 
	 var htmlList = "<div class='item item-divider'><ion-list><ion-item ng-repeat='city in searchCities'><h2>{{city.name}}</h2><p>{{city.alias}}</p></ion-item></ion-list><center><h1>{{error}}</h1></center></div>";
	 console.log( $scope.searchCities);
	 $scope.cityList = htmlList;
    });
        }

    }
}]);

/**
 * A google map / GPS controller.
 */
BkpkApp.controller('GpsCtrl', ['$scope', '$ionicPlatform', '$location',
    function($scope, $ionicPlatform, $location) {


        // init gps array
        $scope.whoiswhere = [];
        $scope.basel = {
            lat: 53.349757186458866,
            lon: -6.259932518005371
        };


        // check login code
        $ionicPlatform.ready(function() {

            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.position = position;
                var c = position.coords;
                $scope.gotoLocation(c.latitude, c.longitude);
                $scope.$apply();
            }, function(e) {
                console.log("Error retrieving position " + e.code + " " + e.message)
            });
            $scope.gotoLocation = function(lat, lon) {
                if ($scope.lat != lat || $scope.lon != lon) {
                    $scope.basel = {
                        lat: lat,
                        lon: lon
                    };
                    if (!$scope.$$phase) $scope.$apply("basel");
                }


            };

            // some points of interest to show on the map
            // to be user as markers, objects should have "lat", "lon", and "name" properties
            $scope.whoiswhere = [{
                "name": "My Marker",
                "lat": $scope.basel.lat,
                "lon": $scope.basel.lon
            }, ];

        });


    }
]);

/**
 * MAIN CONTROLLER - handle inapp browser
 */
BkpkApp.controller('HelpCtrl', ['$scope', function($scope) {

}]);

// formats a number as a latitude (e.g. 40.46... => "40°27'44"N")
BkpkApp.filter('lat', function() {
    return function(input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ns = input > 0 ? "N" : "S";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ns;
    }
});

// formats a number as a longitude (e.g. -80.02... => "80°1'24"W")
BkpkApp.filter('lon', function() {
    return function(input, decimals) {
        if (!decimals) decimals = 0;
        input = input * 1;
        var ew = input > 0 ? "E" : "W";
        input = Math.abs(input);
        var deg = Math.floor(input);
        var min = Math.floor((input - deg) * 60);
        var sec = ((input - deg - min / 60) * 3600).toFixed(decimals);
        return deg + "°" + min + "'" + sec + '"' + ew;
    }
});


/**
 * Menu item click directive - intercept, hide menu and go to new location
 */
BkpkApp.directive('clickMenulink', function() {
    return {
        link: function($scope, element, attrs) {
            element.on('click', function(scope) {
                $scope.sideMenuController.toggleLeft();
            });
        }
    }
});

/**
 * Handle Google Maps API V3+
 */
// - Documentation: https://developers.google.com/maps/documentation/
BkpkApp.directive("appMap", function($window, $http) {
    // console.log("appMap");
    var markersList = [];
    var citiesList = [];
    $window.clearMarks = function() {
        setAllMap(null);
    }

    $window.calcTrip = function() {
        for (var i = 0; i < markersList.length; i++) {
            markedCities = markersList;
            window.location.href = '#/app/calc';
            //  				  var m = markersList[i];
            //  		console.log(m);
            //		  console.log(markersList[i].position.lat() );
            //		  getName(markersList[i].position.lat(), markersList[i].position.lng());
        }

    }

    function setAllMap(map) {
        for (var i = 0; i < markersList.length; i++) {
            markersList[i].setMap(map);

        }
        markersList = [];
    }


    return {
        restrict: "E",
        replace: true,
        template: "<div></div>",
        scope: {
            center: "=", // Center point on the map (e.g. <code>{ latitude: 10, longitude: 10 }</code>).
            markers: "=", // Array of map markers (e.g. <code>[{ lat: 10, lon: 10, name: "hello" }]</code>).
            width: "@", // Map width in pixels.
            height: "@", // Map height in pixels.
            zoom: "@", // Zoom level (one is totally zoomed out, 25 is very much zoomed in).
            mapTypeId: "@", // Type of tile to show on the map (roadmap, satellite, hybrid, terrain).
            panControl: "@", // Whether to show a pan control on the map.
            zoomControl: "@", // Whether to show a zoom control on the map.
            scaleControl: "@" // Whether to show scale control on the map.
        },
        link: function(scope, element, attrs) {
                var toResize, toCenter;
                var map;
                var infowindow;
                var currentMarkers;
                var callbackName = 'InitMapCb';

                // callback when google maps is loaded
                $window[callbackName] = function() {
                    // console.log("map: init callback");
                    createMap();
                    updateMarkers();
                };

                if (!$window.google || !$window.google.maps) {
                    //console.log("map: not available - load now gmap js");
                    loadGMaps();
                } else {
                    //   console.log("map: IS available - create only map now");
                    createMap();
                }

                function loadGMaps() {
                    //    console.log("map: start loading js gmaps");
                    var script = $window.document.createElement('script');
                    script.type = 'text/javascript';
                    script.src = 'http://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&callback=InitMapCb';
                    $window.document.body.appendChild(script);
                }

                function createMap() {
                    //  console.log("map: create map start");
                    var mapOptions = {
                        zoom: 5,
                        center: new google.maps.LatLng(53.34, -6.25),
                        mapTypeId: google.maps.MapTypeId.ROADMAP,
                        panControl: true,
                        zoomControl: true,
                        mapTypeControl: true,
                        scaleControl: false,
                        streetViewControl: false,
                        navigationControl: true,
                        disableDefaultUI: true,
                        overviewMapControl: true
                    };
                    if (!(map instanceof google.maps.Map)) {
                        // console.log("map: create map now as not already available ");
                        map = new google.maps.Map(element[0], mapOptions);
                        // EDIT Added this and it works on android now
                        // Stop the side bar from dragging when mousedown/tapdown on the map
                        google.maps.event.addDomListener(element[0], 'mousedown', function(e) {
                            e.preventDefault();
                            return false;
                        });
                        infowindow = new google.maps.InfoWindow();
                    }
                }

                //        scope.$watch('markers', function() {
                //          updateMarkers();
                //          });

                // Info window trigger function 
                function onItemClick(pin, label, datum, url) {
                    // Create content  
                    var contentString = "Name: " + label + "<br />Time: " + datum;
                    // Replace our Info Window's content and position
                    infowindow.setContent(contentString);
                    infowindow.setPosition(pin.position);
                    infowindow.open(map)
                    google.maps.event.addListener(infowindow, 'closeclick', function() {
                        //   console.log("map: info windows close listener triggered ");
                        infowindow.close();
                    });
                }
                google.maps.event.addListener(map, 'click', function(event) {
                    //  console.log("Adding mark on lat " + event.latLng.lat() + " lng " + event.latLng.lng());
                    addMarker(event.latLng);
                    //  				 getName(event.latLng.lat(), event.latLng.lng());
                });




                function markerCb(marker, member, location) {
                    // console.log("markerCb");
                    return function() {
                        //   console.log("map: marker listener for " + member.name);
                        var href = "http://maps.apple.com/?q=" + member.lat + "," + member.lon;
                        map.setCenter(location);
                        onItemClick(marker, member.name, member.date, href);
                    };
                }

                function addMarker(location) {
                    citiesList.push(location);
                    var marker = new google.maps.Marker({
                        position: location,
                        map: map
                    });
                    markersList.push(marker);

                    //  updateMarkers();
                    //  			 printMarks();
                }

                function printMarks() {

                    for (var i = 0; i < markersList.length; i++) {
                        var m = markersList[i];
                        var loc = new google.maps.LatLng(m.lat, m.lon);
                        var mm = new google.maps.Marker({
                            position: loc,
                            map: map,
                            title: m.name
                        });
                        //console.log("Print mark on lat "+markersList[i].position.lat()+" lng "+markersList[i].position.lng());
                    }
                }

                // convert current location to Google maps location
                function getLocation(loc) {
                    if (loc == null) return new google.maps.LatLng(40, -73);
                    if (angular.isString(loc)) loc = scope.$eval(loc);
                    return new google.maps.LatLng(loc.lat, loc.lon);
                }

            } // end of link:
    }; // end of return
});