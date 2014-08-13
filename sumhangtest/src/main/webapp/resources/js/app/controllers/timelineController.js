app.controller('TimeLineController', ['$scope', '$route','$routeParams','timeLineFactory','globalFactory',
                                      function ($scope, $route, $routeParams, timeLineFactory,globalFactory) {

	//메인컨트롤러 실행시 메인 함수가 실행한다. 메인함수가 하는역활 디비에서 메인 화면에 뿌려줄 자료 가져와서 
	//메인 html파일과 연결 시킴 
	
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