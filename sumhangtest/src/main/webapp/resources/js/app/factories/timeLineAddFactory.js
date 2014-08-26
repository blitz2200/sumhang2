app.factory('timeLineAddFactory',['$http', function($http){
	var timeLineAddFactory = {};
	
	 timeLineAddFactory.timeLineAdd=function(sa,timeLine,travelNo){
		timeLine.tboardNo=travelNo;
		return $http({
			'url': sa+"timeLineAdd.ajax",
			'method' : 'POST',
			'data' : timeLine
		}).success(function(){
			console.log('타임라인 글쓰기 팩토리 성공')
		}).error(function(){
			console.log('타임랑니 글쓰기 팩토리 실패')
		})
	};
	
	return timeLineAddFactory;
}])