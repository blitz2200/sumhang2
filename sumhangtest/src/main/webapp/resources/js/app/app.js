/// <reference path="../Scripts/angular-1.1.4.js" />

/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like to break AngularJS apps into the following folder structure
  at a minimum:

  /app
      /controllers      
      /directives
      /services
      /partials
      /views

  #######################################################################*/
$(function () {

	//css 로딩하기
	loadCSS = function (href) {
	var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
	$("head").append(cssLink);
	};
	loadCSS("resources/css/sumhangManagementStyles.css");
});


var app = angular.module('sumhangApp', ['ngRoute']);

//This configures the routes and associates each route with a view and a controller
app.config(function ($routeProvider) {
    $routeProvider
        .when('/addtrip',
            {
                controller: 'AddTripController',
                templateUrl: 'partials/addTrip.html'
            })
        .when('/joinmember',
            {
                controller: 'JoinMemberController',
                templateUrl: 'partials/joinMember.html'
            })    
        .when('/leftside',
            {
                controller: 'LeftSideController',
                templateUrl: 'partials/leftSide.html'
            })
        .when('/login',
            {
                controller: 'LoginController',
                templateUrl: 'partials/login.html'
            })
        .when('/main',
            {
                controller: 'MainController',
                templateUrl: 'partials/main.html'
            })
        .when('/modifymember',
            {
                controller: 'ModifyMemberController',
                templateUrl: 'partials/modifyMember.html'
            })
        .when('/settings',
            {
                controller: 'SettingsController',
                templateUrl: 'partials/settings.html'
            })
        .when('/timeline',
            {
                controller: 'TimeLineController',
                templateUrl: 'partials/timeLine.html'
            })
        .when('/tripdetail',
            {
                controller: 'TripDetailController',
                templateUrl: 'partials/tripDetail.html'
            })
        .when('/tripmanager',
            {
                controller: 'TripManagerController',
                templateUrl: 'partials/tripManager.html'
            })
        .when('/versioninfo',
            {
                controller: 'VersionInfoController',
                templateUrl: 'partials/versionInfo.html'
            })
        .otherwise({ redirectTo: '/login' });
});

