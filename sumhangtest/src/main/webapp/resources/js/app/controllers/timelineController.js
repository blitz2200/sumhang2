app.controller('TimeLineController', ['$scope', '$route','$routeParams','tripDetailFactory','timeLineFactory','modalService','globalFactory',
                                      function ($scope, $route, $routeParams, tripDetailFactory, timeLineFactory, modalService, globalFactory) {


	
	//서버 주소 설정
	var sa=globalFactory.serverAddress;
	$scope.serverAddress=sa;
	
	console.log('timeLine 시작');
	var travelNo = $routeParams.travelNo;	
	var timelineNo=$routeParams.timelineNo;
	
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
	
	/*댓글 쓰기 modal 연결*/
	$scope.goWriteReply=function(){	   
		
		/*상세보기 삭제 modal 설정*/
		 var modalDefaults = {
				 	backdrop: true,
		            keyboard: true,
		            modalFade: true,
	                templateUrl: '/partials/timelineReplyModal.html',
	            };
		 
		 var modalOptions = {
		            closeButtonText: '취소',
		            actionButtonText: '입력',
		            headerText: '게시물 삭제',
		            bodyText: '게시물을 정말  삭제하시겠습니까?'
		        };
		 
		 /*modal 페이지*/
		 modalService.showModal(modalDefaults, modalOptions).then(function () {
			 console.log('아무거나')
			 $scope.updateTimelineReply(travelNo,timelineNo);  
	        });
	}
	
	//리플 리스트 시작
	function timelineListReply(travelNo,timelineNo){
		console.log('timelineReply 시작')
		timeLineFactory.timelinelListReply(sa,travelNo,timelineNo)
		.success(function(data){
			console.log('디비에서 꺼내온 main detail reply data:'+JSON.stringify(data));
		
			$scope.replys=data;
			console.log('html에 출력할 리플라이 데이타 '+JSON.stringify($scope.replys));
		}).error(function(error){
			console.log('timelinelReply 콘트롤러 실패');
		})
	}
	
	
	
	//타임라인 댓글 달기 시작
	
	$scope.updateTimelineReply=function(timelineNo){
		timelineReply(timelineNo);
	}
	
	
	
	function timelineReply(timelineNo){
		console.log('timelineReply 입력 함수 시작');
		var timelineData=$scope.timelinelReply;
			
		console.log('받아온	timelineData  값은: '+timelineData);
		console.log('받아온 travelNo 값은: '+travelNo);
		console.log('받아온 timelineNo 값은: '+timelineNo);
		
		timeLineFactory.timelineReply(sa,timelineData,travelNo,timelineNo)
		.success(function(timelineNo){
			console.log('타임라인 리플 입력완료')
		}).error(function(error){
			console.log('타임라인 리플 입력 실패')
		})
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
	
	/*메인 라우터*/
	$scope.goMain=function(){
		$scope.location.path('/main');		
	}
	
}]);