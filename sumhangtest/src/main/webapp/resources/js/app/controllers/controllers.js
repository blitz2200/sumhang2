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

app.controller('JoinMemberController', ['$scope', 'sumhangService', function ($scope, sumhangService) {
	$scope.addMemberRequest = function(){
		
		var user =$scope.newMember;
		var uploadUrl="addFile.ajax";
		var userUrl="addUser.ajax"
		var file=$scope.file;
		alert("회원가입 시작");
    	alert('회원이메일:'+$scope.newMember.id);
		alert('업로드 파일은 :' + JSON.stringify(file));
		
		sumhangService.addUser(user,userUrl);
		sumhangService.addFile(file,uploadUrl);	
		
	}
	
/*
	 $scope.complete = function(content) {
	      console.log(content); // process content
	 }*/
    /*$scope.addMemberRequest = function () {
    	var file=$scope.file;
    	alert("회원가입 시작");
    	alert($scope.newMember.id);
    	alert('업로드 파일은 ?' + JSON.stringify(file))
    	var uploadUrl="addMember.ajax"
    	addMember($scope.newMember,file);
    	
    };
    
    function addMember(newMember){
    	sumhangFactory.addMember(newMember,file)
    	.success(function(){
    		alert(newMember);
    	}).error(function (error){
    		
    	});
    }*/
    
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
