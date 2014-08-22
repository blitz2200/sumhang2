app.factory('pushInviteFactory',['$http',function($http){	
	
	var pushInviteFactory = {};
	
	pushInviteFactory.pushInviteUser=function(sa,userNo){
		console.log('초대 푸쉬버큰 클릭'+userNo);
		return $http({
			'url':sa+"pushInviteUser.ajax",
			'method' : 'POST',
			'data' : {'userNo':userNo}
		}).success(function(data){
			console.log('여행 초대해기 버튼 날리기 성공')
		}).error(function(){
			console.log('여행 초대하기 버튼 날리기 실패')
		})		
	}
	
	return pushInviteFactory;
}])