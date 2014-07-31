app.controller('IntroController', function ($scope, sumhangService) {

    init();

    function init() {
    	
    }
    //you need to describe event handler below... 
});


app.controller('LoginController', ['$scope', 'sumhangFactory', 
                                     function ($scope, sumhangFactory) {
    

    $scope.loginRequest = function () {        
        alert('로그인 시작')
        location.hash='/main';     
    };
    
    
    function loginRequest(){

    }

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
		
        location.hash='/login';  
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


app.controller('MainController',['$scope','mainFactory', function ($scope, mainFactory) {

	//메인컨트롤러 실행시 메인 함수가 실행한다. 메인함수가 하는역활 디비에서 메인 화면에 뿌려줄 자료 가져와서 
	//메인 html파일과 연결 시킴 
    main();

    function main() {
    	alert('메인 컨트롤러 시작');
    	
    	mainFactory.listMain()
    	.success(function(data){
    		alert('로그인 성공 넘어온 데이타는 ?:'+ data);
    		//메인 객체와 디비에서 넘어온 객체 연결 
    		$scope.trips=data;
    		alert("메인에 넘길데이타 :" +$scope.trips);		
    	}).error(function (error){
    		alert('로그인 실패');
    	});
    }
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
