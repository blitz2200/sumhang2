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
    	.when('/intro',    			
            {
                controller: 'IntroController',
                templateUrl: 'partials/intro.html'
            })
    	.when('/login',    			
            {
                controller: 'LoginController',
                templateUrl: 'partials/login.html'
            })
        .when('/addTrip',
            {
                controller: 'AddTripController',
                templateUrl: 'partials/addTrip.html'
            })
        .when('/joinMember',
            {
                controller: 'JoinMemberController',
                templateUrl: 'partials/joinMember.html'
            })    
        .when('/leftSide',
            {
                controller: 'LeftSideController',
                templateUrl: 'partials/leftSide.html'
            })
       
        .when('/main',
            {
                controller: 'MainController',
                templateUrl: 'partials/main.html'
            })
        .when('/modifyMember',
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
        .otherwise({ redirectTo: '/intro' });
});

