app.controller('IntroController', ['$scope','sumhangFactory', 
                                   function ($scope, sumhangFactory) {
	
	function loginCheck(){
		sumhangFactory.loginCheck()
		.success(function(data){ 
			
			console.log(data.isLogged);
			if(data.isLogged){
				$scope.location.path('/main');
			}else{
				$scope.location.path('/login');
			}
			
		}).error(function (error){
		
		});
	}
	
	$scope.loginCheck = function () {
		console.log('logincheck invoked....');
		loginCheck();
	}
	
	

	
}]);

app.controller('LoginController', ['$scope','sumhangFactory', 
                                     function ($scope, sumhangFactory) {
    
    
    function loginRequest(loginInfo){
    	sumhangFactory.loginRequest(loginInfo)
    	.success(function(data){
    		
    		console.log(data);
			if(data == ""){
				$scope.location.path('/login');
			}else if(data.role == "noMember"){
				$scope.location.path('/login');
			}else{
				$scope.location.path('/main');
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
		
		$scope.location.path('/login');  
	}
    
}]); 
//회원가입 controller 끝


app.controller('LeftSideController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});


/*AddTrip Controller 시작*/
app.controller('AddTripController', ['$scope',  'sumhangService', function ($scope, sumhangService) {

    $scope.addTripRequest = function () {
    	
    	alert("여행참가신청 시작...");
    	
    	var trip =$scope.newTrip;
		var uploadtripUrl="addTripFile.ajax";
		var tripUrl="addTrip.ajax"
		var tripfile=$scope.tripfile;		
    	
		alert('여행 등록 내용  :'+JSON.stringify(trip));
		
			alert('업로드 파일은 :' + JSON.stringify(tripfile.name));
    	
			//파일객체에서 이름을 빼서 tripFile에 저장후 substr함수로 따음표 잘라내기
			var tripFile= JSON.stringify(tripfile.name)
						  .substr(1,JSON.stringify(tripfile.name).length-2);
			alert('여행파일은? :'+tripFile)
			
			//여행등록 객체에 파일이름 추가 
			trip.travelPho=tripFile;	
			
			alert("사진 파일 추가후 업로드"+JSON.stringify(trip));
			
			//여행객체 서비스에 전송
			sumhangService.addTrip(trip,tripUrl);
			
			//파일객체 서비스에 전송
			sumhangService.addTripFile(tripfile,uploadtripUrl);	
		}
}]);


app.controller('MainController',['$scope','$route','mainFactory', function ($scope,$route, mainFactory) {

	//메인컨트롤러 실행시 메인 함수가 실행한다. 메인함수가 하는역활 디비에서 메인 화면에 뿌려줄 자료 가져와서 
	//메인 html파일과 연결 시킴 
	
	//main();
	$scope.checked;//This will be binded using the ps-open attribute
	$scope.trips = $route.current.locals.trips; //resolve에 있는 변수를 scope에 넘겨준다.

   /*function main() {
    	console.log('메인 컨트롤러 시작');
    	
    	mainFactory.listMain()
    	.success(function(data){
    		console.log('로그인 성공 넘어온 데이타는 ?:'+ data);
    		//메인 객체와 디비에서 넘어온 객체 연결 
    		$scope.trips=data;
    		console.log("메인에 넘길데이타 :" +$scope.trips);		
    	}).error(function (error){
    		console.log('로그인 실패');
    	});
    }*/
    //you need to describe event handler below... 
}]);



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

app.controller('TimeLineController', ['$scope','$route','timeLineFactory',
                                      function ($scope, $route, timeLineFactory) {

	//메인컨트롤러 실행시 메인 함수가 실행한다. 메인함수가 하는역활 디비에서 메인 화면에 뿌려줄 자료 가져와서 
	//메인 html파일과 연결 시킴 
	
	//main();
	$scope.checked;//This will be binded using the ps-open attribute
	$scope.timeLine = $route.current.locals.timeLine; //resolve에 있는 변수를 scope에 넘겨준다.
	
}]);

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
