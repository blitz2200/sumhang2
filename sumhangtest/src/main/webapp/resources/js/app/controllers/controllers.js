/*#######################################################################
  
  Dan Wahlin
  http://twitter.com/DanWahlin
  http://weblogs.asp.net/dwahlin
  http://pluralsight.com/training/Authors/Details/dan-wahlin

  Normally like the break AngularJS controllers into separate files.
  Kept them together here since they're small and it's easier to look through them.
  example. 

  #######################################################################*/
app.controller('AddTripController', function ($scope, sumhangService) {

    //I like to have an init() for controllers that need to perform some initialization. Keeps things in
    //one place...not required though especially in the simple example below
    init();

    function init() {
    	$scope.newTrip.title = '';
        $scope.newTrip.dest = '';
        $scope.newTrip.start = '';
        $scope.newTrip.end = '';
        $scope.newTrip.recruitNum = '';
        $scope.newTrip.desc = '';
    }

    $scope.addTrip = function () {
        var title = $scope.newTrip.title;
        var dest = $scope.newTrip.dest;
        var start = $scope.newTrip.start;
        var end = $scope.newTrip.end;
        var recruitNum = $scope.newTrip.recruitNum;
        var desc = $scope.newTrip.desc;
        sumhangService.insertTrip(title, dest, start, end, recruitNum, desc);
        init();
        location.hash = '/main';
    };
});

app.controller('JoinMemberController', function ($scope, sumhangService) {

    init();

    function init() {
//    	$scope.newMember.id = '';
//    	$scope.newMember.name = '';
//    	$scope.newMember.password = '';
//    	$scope.newMember.nick = '';
//    	$scope.newMember.birth = '';
//    	$scope.newMember.gender = '';
//    	$scope.newMember.photo = '';
//    	$scope.newMember.pushmsg = '';
//    	$scope.newMember.invitemsg = '';
    }

    $scope.addMemberRequest = function () {
    	alert("addMemberRequest event detected...");
//    	var id = $scope.newMember.id;
//    	var name = $scope.newMember.name;
//    	var password = $scope.newMember.password;
//    	var nick = $scope.newMember.nick;
//    	var birth = $scope.newMember.birth;
//    	var gender = $scope.newMember.gender;
//    	var photo = $scope.newMember.photo;
//    	var pushmsg = $scope.newMember.pushmsg;
//    	var invitemsg = $scope.newMember.invitemsg;
        sumhangService.insertMember("yihyosang", "yi hyo sang", "1234", "little tree", "1980/12/23", "male", "C:\picture.jpg", "yes", "yes");
        init();
    };
});

app.controller('LeftSideController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});

app.controller('LoginController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below...
    $scope.loginRequest = function () {
    	alert("loginRequest event detected...");
    	location.hash = '/main';
    };
});

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
