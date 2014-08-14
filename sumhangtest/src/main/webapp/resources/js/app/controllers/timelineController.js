app.controller('TimeLineController', ['$scope', '$route','$routeParams','tripDetailFactory','timeLineFactory','globalFactory',
                                      function ($scope, $route, $routeParams, tripDetailFactory, timeLineFactory,globalFactory) {


	
	//서버 주소 설정
	var sa=globalFactory.serverAddress;
	$scope.serverAddress=sa;
	
	console.log('timeLine 시작');
	var travelNo = $routeParams.travelNo;	
	//$scope.timeLine = $route.current.locals.timeLine; //resolve에 있는 변수를 scope에 넘겨준다.
	getTravelInfo(travelNo)
	getTimelineList(travelNo);
	
	function getTravelInfo(travelNo) {
		tripDetailFactory.tripDetail(sa,travelNo)
		.success(function(data){
			$scope.tripDetail = data;
		}).error(function (error){
    		console.log('getTravelInfo 실패');
    	});
	}
	
	function getTimelineList(travelNo) {
		timeLineFactory.getTimelineList(sa,travelNo)
		.success(function(data){
			$scope.timelines = data;
		}).error(function (error){
    		console.log('getTimeLine 실패');
    	});
	}
	
	/*로그아웃*/
	$scope.logout=function(){		
		mainFactory.logout(globalFactory.serverAddress).success(function (){
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