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
     - State: app.about
     - Controller: 
* appCItyInfo.html
     - State: app.city
     - Controller: CityCtrl
* appCityInfoReview.html
     - State: app.cityRv
     - Controller: CityCtrlRV
* appCreateReview.html
     - State: app.createReview
     - Controller: CreateReviewCtrl
* appHome.html
     - State: app.home
     - Controller: HomeCtrl
* appIndex.html
     - State: 
     - Controller:  SimpleCtrl
* appList.html
    - State: app.list
    - Controller: ListCtrl
* appLogin.html
     - State: app.login
     - Controller: LoginCtrl
* appLogout.html
     - State: app.logout
     - Controller: LogoutCtrl
* appMap.html
     - State: app.map
     - Controller: GpsCtrl
* appMapCalc.html
     - State: app.calc
     - Controller: CalcCtrl
* appMyWishlist.html
     - State: app.myWish
     - Controller: MyWishCtrl
* appProfile.html
     - State: app.profile
     - Controller: ProfileCtrl
* appRegister.html
     - State: app.register
     - Controller: RegisterCtrl
* appReviewList.html
     - State: app.Reviewlist
     - Controller: ReviewListCtrl
* appReviews.html
     - State: app.reviews
     - Controller: ReviewCtrl
* appSearchCityForReview.html
     - State: app.searchCityForReview
     - Controller: SearchCityForReviewCtrl
* appTripPlan.html
     - State: app.tripPlan
     - Controller: TripPlanCtrl
* appTrips.html
     - State: app.trips
     - Controller: TripCtrl
* appWishlist.html
     - State: app.wishlist
     - Controller: WiLiCtrl
* menu.html
     - State: 
     - Controller: HeaderCtrl


## Controllers ##
* HeaderCtrl: Control the header, buttons and helps to control the user authentication.
     - function: leftButtons : add the menu button to the header.
     - function: addRighButtons : add to the header the button to add a city to your wishlist.
     - function: wishButtons : add to the header the button to show the list of cities in the wishlist.
     - function: reviewButtons : add to the header the button to search to a city for review.
* MainCtrl: Controls the Home page and filling the initial trending list.
     - function: cityInfo :  saves the cityId and redirect to the app.city
* SimpleCtrl: Control the index page to redirect to login page or to register page.
     - function: login : redirect to the app.login
     - function register: redirect to the app.register
* WiLiCtrl: Controls the search for city and build he url to call the web service and redirect to the list page.
     - function: search : verify the fields and seach the city, store the url for the future search and redirect to the app.list
* ListCtrl: Control the list page where are load the list with the cities returned by the service.
     - function: wishCityInfo : saves the cityId and redirect to the app.city
* CityCtrl: Show the city details;
* MyWishCtrl : Show the cities in wishlist.
     - function: cityInfo :  saves the cityId and redirect to the app.city
* ReviewListCtrl :  Show the cities result to the user seach
     - function: cityInfo :  saves the reviewCity and redirect to the app.cityRv
* CreateReviewCtrl: get the reviewCity build the url to search the city in the web server and add an review to it;
     - function: create : save the review in the webservice
* ReviewCtrl: Show the cities that the user has reviewed
     - function: cityInfo :  saves the reviewCity and redirect to the app.cityRv
* SearchCityForReviewCtrl