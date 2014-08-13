app.controller('MainController',['$scope','$route','mainFactory','globalFactory',
                                 function ($scope,$route, mainFactory,globalFactory) {

	//메인컨트롤러 실행시 메인 함수가 실행한다. 메인함수가 하는역활 디비에서 메인 화면에 뿌려줄 자료 가져와서 
	//메인 html파일과 연결 시킴 
	
	//main();
	//서버 주소 설정
	$scope.serverAdress=globalFactory.serverAdress;
	
	$scope.checked;//This will be binded using the ps-open attribute
	$scope.trips = $route.current.locals.trips; //resolve에 있는 변수를 scope에 넘겨준다.
	$scope.userTrips = $route.current.locals.userTrips; //resolve에 있는 변수를 scope에 넘겨준다.
	$scope.sessionUser = $route.current.locals.sessionUser; //resolve에 있는 변수를 scope에 넘겨준다
	$scope.userTripSelected = $scope.userTrips[0];
	
	$scope.date =new Date();
	
	$scope.hideDelMenu = function(tripUser){
		console.log('sessionuser :'+JSON.stringify($scope.sessionUser.userNo))
		console.log('hideDelMenu tripUser : '+JSON.stringify($scope.userTripSelected));
		
		
		if($scope.sessionUser.userNo != $scope.userTripSelected.USER_NO){
			return true;
		}else if(tripUser.USER_NO == $scope.userTripSelected.USER_NO){
			return true;
		}else{
			return false;
		}
	}
	
	$scope.kickOutTripUser = function (userNo){
		console.log(userNo);
		mainFactory.kickOutTripUser($scope.userTripSelected.TBOARD_NO,userNo)
		.success(function(){
    		console.log('kickOutTripUser 성공');
    		$scope.getTripUsers();
    		
    	}).error(function (error){
    		console.log('kickOutTripUser 실패');
    	});		
	}


	
	$scope.tripUserKickOut = function (){
		$scope.$watch(userSelect,function(){
			console.log('watchUserSelect funciton invoked..');
			//console.log('indiUser : '+$scope.attendingUsers.indiUser);
			console.log(JSON.stringify(kickOutUser));
			
		});
		console.log('강퇴할 userNo'+$scope.kickOut.userNo);
		
	}

	
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