app.controller('IntroController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('LoginController', ['$scope', 'sumhangFactory', 
                                     function ($scope, sumhangFactory) {
    
    
    function loginRequest(){
    	sumhangFactory.loginRequest()
    	.success(function(){
    		
    	}).error(function (error){
    		
    	});
    }

    $scope.loginRequest = function () {        
        location.hash = '/main';
    };
}]);

app.controller('JoinMemberController', ['$scope', 'sumhangFactory', 
                                        function ($scope, sumhangFactory) {
	
	


    $scope.addMemberRequest = function () {
    	alert("addMemberRequest event detected...");
    	alert($scope.newMember.id);
    	addMember($scope.newMember);
    	
    };
    
    function addMember(newMember){
    	sumhangFactory.addMember(newMember)
    	.success(function(){
    		alert(newMember);
    	}).error(function (error){
    		
    	});
    }
    
}]);

app.controller('LeftSideController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('AddTripController', ['$scope', 'addTripFactory', 
                                   function ($scope, addTripFactory) {

    $scope.addTripRequest = function () {
    	alert("여행참가테스트...");
    	alert($scope.newTrip.title);
    	addTrip($scope.newTrip);
    	
    };
    
    function addTrip(newTrip){
    	addTripFactory.addTrip(newTrip)
    	.success(function(){
    		alert(newTrip);
    	}).error(function (error){
    		
    	});
    }
    
}]);

app.controller('MainController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('ModifyMemberController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('SettingsController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('TimeLineController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('TripDetailController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('TripManagerController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('VersionInfoController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});
