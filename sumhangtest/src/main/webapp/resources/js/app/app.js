$(function () {
	
	//css 로딩하기
	loadCSS = function (href) {
	var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
	$("head").append(cssLink);
	};
	loadCSS("");
});


var app = angular.module('sumhangApp', ['ngRoute','pushNotify','pageslide-directive']);

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
                	},
                	sessionUser : function (userFactory){
                		return userFactory.getSessionUser().then(function (response){ 
                			console.log(response.data);
                			return response.data;
                		});
                	},
                	userTrips : function (mainFactory){
                		return mainFactory.getUserTrip().then(function (response){                			
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
        .when('/timeLine/:travelNo',
            {
                controller: 'TimeLineController',
                templateUrl: 'partials/timeLine.html'
            	/*resolve: {//브라우저가 뿌려줄 데이터를 먼저 db에서 가져와 변수로 저장하고 변수에 저장된후에 값들과 함께 template에 뿌려준다.
                	timeLine :function(timeLineFactory){
                		return timeLineFactory.listTimeLine().then(function (response){
                			return response.data;
                		});
                	}
                }*/
            })
        .when('/tripDetail/:travelNo',
            {
                controller: 'TripDetailController',
                templateUrl: 'partials/tripDetail.html',
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

app.run(function(pushNotification){
	pushNotification.registerPush();
});

app.directive('jqueryMobileTpl', function () {
    return {
        link: function (scope, elm, attr) {
            //elm.trigger('create');
        }
    };
});
app.directive('repeatDone', function () {
    return function (scope, element, attrs) {
        // When the last element is rendered
        if (scope.$last) { 
            element.parent().parent().trigger('create');
        }
    }
});

