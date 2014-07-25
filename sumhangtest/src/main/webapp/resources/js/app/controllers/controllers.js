/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like the break AngularJS controllers into separate files.
  Kept them together here since they're small and it's easier to look through them.
  example. 

  #######################################################################*/
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
    	
    	
//        sumhangService.insertMember("yihyosang", "yi hyo sang", "1234", "little tree", "1980/12/23", "male", "C:\picture.jpg", "yes", "yes");
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

app.controller('AddTripController', ['$scope', 'sumhangFactory', 
                                   function ($scope, sumhangFactory) {


  /*$scope.addTrip = function () {
      var title = $scope.newTrip.title;
      var dest = $scope.newTrip.dest;
      var start = $scope.newTrip.start;
      var end = $scope.newTrip.end;
      var recruitNum = $scope.newTrip.recruitNum;
      var desc = $scope.newTrip.desc;
      sumhangService.insertTrip(title, dest, start, end, recruitNum, desc);
      init();
      location.hash = '/main';
  };*/
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
