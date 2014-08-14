// 타임라인 팩토리
app.factory('timeLineFactory',['$http', function($http){
	
	var timeLineFactory = {};
	
	timeLineFactory.getTimelineList = function(sa,travelNo){
		//메인 리스트 ajax로 요청
		return $http({
			//timeLine.ajax로 서버에서  전송 스프링 컨트롤러에서 @Requestmapping timeLine찾아서 실행
			'url' :sa+"timeline.ajax",
			'method' : 'POST',
			'data' : travelNo				
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('타임 라인 가져오기 성공'+JSON.stringify(data));
			
		}).error(function(){
			console.log('타임 라인 받아오기 실패');
		})
	};
	//컨트롤러에 작업 완료후 객체 넘겨주기 
	return timeLineFactory;

}])
