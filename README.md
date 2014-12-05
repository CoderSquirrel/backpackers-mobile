# README #

Backpackers app is an Web Mobile App developed using Ionic Framework.

### Technologies ###

* Ionic Framework
* Javascript
* AngularJS


### API's ###

##  Google Maps API ##
* Maps screen
* Markers
* Cities Lat and Lng

## Backpackers API ##
* API key
* Authentication
* City Search
* Database


### System Requirements ###
* Node.js [Official Site](http://nodejs.org/)
* Cordova  $ sudo npm install -g cordova
* Ionic $ sudo npm install -g ionic


## Screens ##
* appAbout.html 
     - State: 
     - Controller: 
* appCItyInfo.html
     - State: 
     - Controller: 
* appCityInfoReview.html
     - State: 
     - Controller: 
* appCreateReview.html
     - State: 
     - Controller: 
* appHome.html
     - State: 
     - Controller: HomeCtrl
* appIndex.html
     - Controller:  SimpleCtrl
* appList.html
    - State: app.list
    - Controller: ListCtrl
* appLogin.html
* appLogout.html
* appMap.html
* appMapCalc.html
* appMyWishlist.html
* appProfile.html
* appRegister.html
* appReviewList.html
* appReviews.html
* appSearchCityForReview.html
* appTripPlan.html
* appTrips.html
* appWishlist.html
     - Controller: WiLiCtrl
* menu.html
     - Controller: HeaderCtrl


## Controllers ##
* HeaderCtrl: Control the header, buttons and helps to control the user authentication.
* MainCtrl: Controls the Home page and filling the initial trending list.
* SimpleCtrl: Control the index page to redirect to login page or to register page.
     - function: login : redirect to the app.login
     - function register: redirect to the app.register
* WiLiCtrl: Controls the search for city and build he url to call the web service and redirect to the list page.
* ListCtrl: Control the list page where are load the list with the cities returned by the service.
     - function: wishCityInfo : saves the cityId and redirect to the app.city