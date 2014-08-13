//메인 팩토리 
app.factory('mainFactory',['$http', function($http){
	
	var mainFactory = {};
	
	mainFactory.listMain = function(){
		//메인 리스트 ajax로 요청
		return $http({
			//main.ajax로 서버에서  전송 스프링 컨트롤러에서 @Requestmapping main찾아서 실행
			'url' :"http://192.168.0.72:8080/main.ajax",
			'method' : 'POST'    		
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('메인 팩토리 성공'+data);
			
		}).error(function(){
			console.log('메인 자료받아오기 실패');
		});
	};
	
	mainFactory.getUserTrip = function(){
		return $http({
			'url' :"http://192.168.0.72:8080/getUserTrip.ajax",
			'method' : 'GET'
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('getUserTrip 성공'+JSON.stringify(data));

		}).error(function(){
			console.log('getUserTrip 실패');
		});
	};
	
	mainFactory.getTripUsers = function(sa,travelNo){
		console.log('travelno'+travelNo);
		return $http({
			'url' :sa+"getTripUsers.ajax",
			'method' : 'POST',
			'data' : travelNo
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('getTripUsers 성공'+JSON.stringify(data));

		}).error(function(){
			console.log('메인 자료받아오기 실패');
		});
	}
	
	mainFactory.kickOutTripUser = function(tBoardNo,userNo){
		console.log('factory:userNo : '+userNo);
		return $http({
			'url' :"kickOutTripUser.ajax",
			'method' : 'POST',
			'data' : {'tBoardNo': tBoardNo+'' ,
    			'userNo' : userNo +'' }
		}).success(function(){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('kickOutTripUser 성공');

		}).error(function(){
			console.log('kickOutTripUser 실패');
		});
	}
	
	
	
	
	
	    /*로그아웃*/
    mainFactory.logout=function(sa){
    	return $http.post(sa+'logout.ajax').success(function() {
    		console.log('logout $http 성공');
    	});
    }
	return mainFactory;

}])