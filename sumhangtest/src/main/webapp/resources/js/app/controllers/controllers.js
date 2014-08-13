app.controller('IntroController', ['$scope','userFactory','globalFactory', 
                                   function ($scope, userFactory,globalFactory) {
	
	function loginCheck(){
		userFactory.loginCheck(globalFactory.serverAdress)
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

app.controller('LoginController', ['$scope','userFactory','globalFactory', 
                                     function ($scope, userFactory,globalFactory) {
    
    
    function loginRequest(loginInfo){
    	
    		
    	userFactory.loginRequest(globalFactory.serverAdress,loginInfo)
    	.success(function(data){
    		
    		console.log(data);
			if(data == ""){
				$scope.location.path('/login');
			}else{
				$scope.location.path('/main');
			}
    		
    	}).error(function (error){
    		
    	});
    	    	
    }

    $scope.loginRequest = function () {
    	$scope.submitted = true;
    	if( $scope.loginForm.username.$valid && $scope.loginForm.password.$valid){
    	console.log('loginInfo :' + $scope.loginInfo);
        loginRequest($scope.loginInfo);
    	}
    	
    };
}]);

app.controller('JoinMemberController', ['$scope', 'sumhangService','globalFactory', 
                                        function ($scope, sumhangService,globalFactory) {
	
	 
	
	
	  $scope.addMemberRequest = function(){
		  	 $scope.submitted = true;	 
			if( $scope.joinMember.inputIdInput.$valid && $scope.joinMember.intputPassword3Input.$valid
		    		&& $scope.joinMember.inputPassword1Input.$valid && $scope.joinMember.nicknameInput.$valid
		    		&& $scope.joinMember.datepicker1.$valid ){
		 $scope.submitted = true;	 
			if( $scope.joinMember.inputIdInput.$valid && $scope.joinMember.intputPassword3Input.$valid
		    		&& $scope.joinMember.inputPassword1Input.$valid && $scope.joinMember.nicknameInput.$valid
		    		&& $scope.joinMember.datepicker1.$valid ){
		console.log("회원가입 시작");
		
		var user =$scope.newMember;
		var file=$scope.file;		
	
		console.log('회원가입 내용  :'+JSON.stringify(user));
		console.log('업로드 파일은 :' + JSON.stringify(file.name));
		
		//파일객체에서 이름을 빼서 userFile에 저장후 substr함수로 따음표 잘라내기
		var userFile= JSON.stringify(file.name)
					  .substr(1,JSON.stringify(file.name).length-2);
		console.log('유저파일은? :'+userFile)
		
		//회원가입 객체에 파일이름 추가 
		user.photo=userFile;	
		
		console.log("사진 파일 추가후 업로드"+JSON.stringify(user));
		
		
		//유저객체 서비스에 전송
		sumhangService.addUser(sa,user);
		
		//파일객체 서비스에 전송
		sumhangService.addFile(sa,file);	
		
		$scope.location.path('/login'); 
			}else{
				alert('양식을 입력하세요');
				
			}
				
		}
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
app.controller('AddTripController', ['$scope',  'sumhangService','globalFactory', 
                                     function ($scope, sumhangService,globalFactory) {
	
	var sa=globalFactory.serverAdress;
    $scope.addTripRequest = function () {
    	$scope.submitted = true;
    	
    	
    	
    	if( $scope.addTripForm.tripTitleInput.$valid && $scope.addTripForm.tripDestinationInput.$valid
    		&& $scope.addTripForm.datepicker3.$valid && $scope.addTripForm.datepicker4.$valid
    		&& $scope.addTripForm.tripNumberInputAddTrip.$valid ){
    	
    	
    	console.log("여행참가신청 시작...");
    	
    	var trip =$scope.newTrip;		
		
		var tripfile=$scope.tripfile;		
    	
			if (typeof $scope.tripfile == 'undifined') {
		console.log('업로드 파일은 :' + JSON.stringify(tripfile.name));
    	
			//파일객체에서 이름을 빼서 tripFile에 저장후 substr함수로 따음표 잘라내기
			var tripFile= JSON.stringify(tripfile.name)
						  .substr(1,JSON.stringify(tripfile.name).length-2);
			console.log('여행파일은? :'+tripFile)
			
			//여행등록 객체에 파일이름 추가 
			trip.travelPho=tripFile;	
			
			console.log("사진 파일 추가후 업로드"+JSON.stringify(trip));
				
				//파일객체 서비스에 전송
		
			sumhangService.addTripFile(sa,tripfile);
			
		}else{
			trip.travelPho='1.png';
			alert("디폴트파일이름"+JSON.stringify(trip.travelPho));
			
		}
		
		alert('여행 등록 내용  :'+JSON.stringify(trip));
		//여행객체 서비스에 전송
		sumhangService.addTrip(sa,trip);
		$scope.location.path('/main');  
		}else{
			alert('양식을 입력하세요');
		}
    	
    }
}]);


app.controller('MainController',['$scope','$route','mainFactory','globalFactory',
                                 function ($scope,$route, mainFactory,globalFactory) {

	//메인컨트롤러 실행시 메인 함수가 실행한다. 메인함수가 하는역활 디비에서 메인 화면에 뿌려줄 자료 가져와서 
	//메인 html파일과 연결 시킴 
	
	//main();
	//서버 주소 설정
	$scope.serverAdress=globalFactory.serverAdress;
	
	$scope.checked;//This will be binded using the ps-open attribute
	$scope.trips = $route.current.locals.trips; //resolve에 있는 변수를 scope에 넘겨준다.
	
	
	$scope.getTripUsers = function (){
		mainFactory.getTripUsers(globalFactory.serverAdress,$scope.userTripSelected.TBOARD_NO)
		.success(function(data){
    		console.log('getTripUsers 성공 넘어온 데이타는 ?:'+ JSON.stringify(data));
    		
    		$scope.tripUsers=data;
    		console.log("getTripUsers 메인에 넘길데이타 :" +JSON.stringify($scope.tripUsers));		
    	}).error(function (error){
    		console.log('getTripUsers 실패');
    	});
	}
	
	/*타임라인 바로가기*/
	$scope.goTimeLine=function(travelNo){
		var temp="timeLine/"+travelNo;
		$scope.location.path(temp);
	}
	
	$scope.goTripDetail=function(travelNo){
		var temp="/tripDetail/"+travelNo;
		$scope.location.path(temp);
	}
	
	/*로그아웃*/
	$scope.logout=function(){		
		mainFactory.logout(globalFactory.serverAdress).success(function (){
			$scope.location.path('/login');
		});
	}
	
	/*회원정보 수정 라우터*/
	$scope.goModifyMember=function(){
		$scope.location.path('/modifyMember');		
	}
	
	/*회원추천 라우터*/
	$scope.inviteRequest=function(){
		$scope.location.path('/tripManager');		
	}

	
	/*버전정보 라우터*/
	$scope.goVersionInfo=function(){
		$scope.location.path('/versionInfo');		
	}
	
	/*셋팅 라우터*/
	$scope.goSettings=function(){
		$scope.location.path('/settings');		
	}
	
	
	/*타임라인쓰기 라우터*/
	$scope.goAddTrip=function(){
		$scope.location.path('/addTrip');		
	}	
	


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

app.controller('TimeLineController', ['$scope', '$route','$routeParams','timeLineFactory','globalFactory',
                                      function ($scope, $route, $routeParams, timeLineFactory,globalFactory) {

	//메인컨트롤러 실행시 메인 함수가 실행한다. 메인함수가 하는역활 디비에서 메인 화면에 뿌려줄 자료 가져와서 
	//메인 html파일과 연결 시킴 
	
	//main();
	console.log('timeLine 시작');
	var travelNo = $routeParams.travelNo;	
	//$scope.timeLine = $route.current.locals.timeLine; //resolve에 있는 변수를 scope에 넘겨준다.
	getTimeLine(travelNo);
	
	function getTimeLine(travelNo) {
		timeLineFactory.getTimeLine(travelNo)
		.success(function(data){
			$scope.timeLine = data;
		}).error(function (error){
    		console.log('getTimeLine 실패');
    	});
	}
	
	/*로그아웃*/
	$scope.logout=function(){		
		mainFactory.logout(globalFactory.serverAdress).success(function (){
			$scope.location.path('/login');
		});
	}
	
	/*회원정보 수정 라우터*/
	$scope.goModifyMember=function(){
		$scope.location.path('/modifyMember');		
	}
	
	/*회원추천 라우터*/
	$scope.inviteRequest=function(){
		$scope.location.path('/tripManager');		
	}

	
	/*버전정보 라우터*/
	$scope.goVersionInfo=function(){
		$scope.location.path('/versionInfo');		
	}
	
	/*셋팅 라우터*/
	$scope.goSettings=function(){
		$scope.location.path('/settings');		
	}
	
	
	/*타임라인쓰기 라우터*/
	$scope.goAddTrip=function(){
		$scope.location.path('/addTrip');		
	}	
	
}]);

//여행 세부 게시판 시작
//main페이지에서 tboard_no를 a링크에 넣어서 보냄  
//app.js파일에  when주소뒤에 :스코프이름 으로 넘긴걸 받음 
//콘트롤러에서  $routeParams를 사용 이것을 받아서 사용 가능  
app.controller('TripDetailController', ['$scope','$routeParams','tripDetailFactory',
                                        function ($scope,$routeParams ,tripDetailFactory) {
	
	
	//넘어온 tboard_no,tripDetailReply값  변수에 저장
	
	var travelNo=$routeParams.travelNo;	
	
	
	//tripDetail함수에 변수값 전달후 실행
	tripDetail(travelNo);
	//tripDetailReply 함수 실행 
	tripDetailListReply(travelNo);
	
	//tripDetail 페이지 시작 
	function tripDetail(travelNo){
		console.log('tripDetail 시작');			
		console.log('넘어온 tboardNo는:'+travelNo);		
		
		tripDetailFactory.tripDetail(travelNo)
		.success(function(data){    		
    		console.log('디비에서 꺼내온 main detail 출력용 data:'+JSON.stringify(data));
			$scope.trip=data;
			console.log("HTML예 출력할 데이타 :" +JSON.stringify($scope.trip));
    		
    	}).error(function (error){
    		console.log('실패');
    		
    	});
	}//tripDetail 끝
	
	
	//리플 리스트 시작
	function tripDetailListReply(travelNo){
		console.log('tripDetailReply 시작')
		tripDetailFactory.tripDetailListReply(travelNo)
		.success(function(data){
			console.log('디비에서 꺼내온 main detail reply data:'+JSON.stringify(data));
			$scope.replys=data;
			console.log('html에 출력할 리플라이 데이타 '+JSON.stringify($scope.replys));
		}).error(function(error){
			console.log('tripDetailReply 콘트롤러 실패');
		})
	}
	
	
	
	//tripDetail 답변 게시판 시작
	
	$scope.goTripDetailReply=function(){
		tripDetailReply();
	}

	function tripDetailReply(){
		console.log('trpDetail 리플 입력 함수 시작');
		var tripDetailData=$scope.tripDetailReply;
			
		console.log('받아온 tripDetailReply 값은: '+tripDetailData);
		console.log('받아온 travelNo 값은: '+travelNo);
		tripDetailFactory.tripDetailReply(tripDetailData,travelNo)
		.success(function(){
			console.log('메인상세 리플 입력완료')
			tripDetailListReply(travelNo);
		}).error(function(error){
			console.log('메인상세 리플 입력 실패')
		})
	}
	
}]);

//여행 세부 게시판 시작
//main페이지에서 tboard_no를 a링크에 넣어서 보냄  
//app.js파일에  when주소뒤에 :스코프이름 으로 넘긴걸 받음 
//콘트롤러에서  $routeParams를 사용 이것을 받아서 사용 가능  
app.controller('TripDetailController', ['$scope','$routeParams','tripDetailFactory',
                                        function ($scope,$routeParams ,tripDetailFactory) {
	
	
	//넘어온 tboard_no,tripDetailReply값  변수에 저장
	
	var travelNo=$routeParams.travelNo;	
	
	
	//tripDetail함수에 변수값 전달후 실행
	tripDetail(travelNo);
	//tripDetailReply 함수 실행 
	tripDetailListReply(travelNo);
	
	//tripDetail 페이지 시작 
	function tripDetail(travelNo){
		console.log('tripDetail 시작');			
		console.log('넘어온 tboardNo는:'+travelNo);		
		
		tripDetailFactory.tripDetail(travelNo)
		.success(function(data){    		
    		console.log('디비에서 꺼내온 main detail 출력용 data:'+JSON.stringify(data));
			$scope.trip=data;
			console.log("HTML예 출력할 데이타 :" +JSON.stringify($scope.trip));
    		
    	}).error(function (error){
    		console.log('실패');
    		
    	});
	}//tripDetail 끝
	
	
	//리플 리스트 시작
	function tripDetailListReply(travelNo){
		console.log('tripDetailReply 시작')
		tripDetailFactory.tripDetailListReply(travelNo)
		.success(function(data){
			console.log('디비에서 꺼내온 main detail reply data:'+JSON.stringify(data));
			$scope.replys=data;
			console.log('html에 출력할 리플라이 데이타 '+JSON.stringify($scope.replys));
		}).error(function(error){
			console.log('tripDetailReply 콘트롤러 실패');
		})
	}
	
	
	
	//tripDetail 답변 게시판 시작
	
	$scope.goTripDetailReply=function(){
		tripDetailReply();
	}
	
	
	
	function tripDetailReply(){
		console.log('trpDetail 리플 입력 함수 시작');
		var tripDetailData=$scope.tripDetailReply;
			
		console.log('받아온 tripDetailReply 값은: '+tripDetailData);
		console.log('받아온 travelNo 값은: '+travelNo);
		tripDetailFactory.tripDetailReply(tripDetailData,travelNo)
		.success(function(){
			console.log('메인상세 리플 입력완료')
			tripDetailListReply(travelNo);
		}).error(function(error){
			console.log('메인상세 리플 입력 실패')
		})
	}
}]);



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

