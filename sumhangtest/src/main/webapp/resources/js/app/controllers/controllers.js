﻿app.controller('IntroController', ['$scope', 'sumhangFactory', 
                                   function ($scope, sumhangFactory) {
	
	function loginCheck(){
		sumhangFactory.loginCheck()
		.success(function(data){ 
			
			console.log(data.isLogged);
			if(data.isLogged){
				location.hash = "main";
			}else{
				location.hash = "login";
			}
			
		}).error(function (error){
		
		});
	}
	
	$scope.loginCheck = function () {
		console.log('logincheck invoked....');
		loginCheck();
	}
	
	

	
}]);

app.controller('LoginController', ['$scope', 'sumhangFactory', 
                                     function ($scope, sumhangFactory) {
    
    
    function loginRequest(loginInfo){
    	sumhangFactory.loginRequest(loginInfo)
    	.success(function(data){
    		
    		console.log(data);
			if(data == ""){
				location.hash = "login";
			}else if(data.role == "noMember"){
				location.hash = "login";
			}else{
				location.hash = "main";
			}
    		
    	}).error(function (error){
    		
    	});
    }

    $scope.loginRequest = function () {
    	console.log('loginInfo :' + $scope.loginInfo);
        loginRequest($scope.loginInfo);
        
    };
}]);

app.controller('JoinMemberController', ['$scope', 'sumhangService', function ($scope, sumhangService) {
	$scope.addMemberRequest = function(){
		
		alert("회원가입 시작");
		
		var user =$scope.newMember;
		var uploadUrl="addFile.ajax";
		var userUrl="addUser.ajax"
		var file=$scope.file;		
	
    	alert('회원가입 내용  :'+JSON.stringify(user));
		alert('업로드 파일은 :' + JSON.stringify(file.name));
		
		//파일객체에서 이름을 빼서 userFile에 저장후 substr함수로 따음표 잘라내기
		var userFile= JSON.stringify(file.name)
					  .substr(1,JSON.stringify(file.name).length-2);
		alert('유저파일은? :'+userFile)
		
		//회원가입 객체에 파일이름 추가 
		user.photo=userFile;	
		
		alert("사진 파일 추가후 업로드"+JSON.stringify(user));
		
		
		//유저객체 서비스에 전송
		sumhangService.addUser(user,userUrl);
		
		//파일객체 서비스에 전송
		sumhangService.addFile(file,uploadUrl);	
	}
    
}]); 
//회원가입 controller 끝

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
