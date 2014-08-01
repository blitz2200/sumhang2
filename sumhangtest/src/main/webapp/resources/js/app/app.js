﻿$(function () {

	//css 로딩하기
	loadCSS = function (href) {
	var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
	$("head").append(cssLink);
	};
	loadCSS("");
});


var app = angular.module('sumhangApp', ['ngRoute', 'pageslide-directive']);

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
                templateUrl: 'partials/main.html',
                resolve: {//브라우저가 뿌려줄 데이터를 먼저 db에서 가져와 변수로 저장하고 변수에 저장된후에 값들과 함께 template에 뿌려준다.
                	trips :function(mainFactory){
                		return mainFactory.listMain().then(function (response){
                			return response.data;
                		});
                	}
                }
                	
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

app.run(function($rootScope, $location){
	$rootScope.location = $location;
});

