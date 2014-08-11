//유저 팩토리
app.factory('userFactory', ['$http', function($http) {
    	
    var urlBase = '';
    var userFactory = {};   
    
    userFactory.loginCheck = function () {    	
    	return $http({
    			'url' : 'loginCheck.ajax',
    			'method' : 'POST',
    			'headers': {'Content-Type' : 'application/json'}	
    		}).success(function (data) {
    			console.log('$http 성공');
    			console.log(data);
    		}).error(function () {
    			
    		});
    }
        
    userFactory.loginRequest = function (loginInfo) {    	
    	return $http({
    			'url' : 'login.ajax',
    			'method' : 'POST',
    			'headers': {'Content-Type' : 'application/json'},
	        	'data' : {'username': loginInfo.id ,
	        			'password' : loginInfo.password }    		
    		}).success(function (data) {
    			console.log('loginRequest $http 성공');
    			console.log(data);
    			
    		}).error(function () {
    			
    		});
    }
    
    userFactory.getSessionUser = function (){
    	return $http({
			'url' : 'getSessionUser.ajax',
			'method' : 'POST',
			'headers': {'Content-Type' : 'application/json'}        	   		
		}).success(function (data) {
			console.log('getSessionUser $http 성공');
			console.log(data);			
		}).error(function () {			
		});
    }
    
    return userFactory;
}]);


//메인 팩토리 
app.factory('mainFactory',['$http', function($http){
	
	var mainFactory = {};
	
	mainFactory.listMain = function(){
		//메인 리스트 ajax로 요청
		return $http({
			//main.ajax로 서버에서  전송 스프링 컨트롤러에서 @Requestmapping main찾아서 실행
			'url' :"main.ajax",
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
			'url' :"getUserTrip.ajax",
			'method' : 'GET'
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('getUserTrip 성공'+JSON.stringify(data));
			console.log('getUserTrip 성공'+JSON.stringify(data[0].TITLE));

		}).error(function(){
			console.log('메인 자료받아오기 실패');
		});
	};
	
	mainFactory.getTripUsers = function(travelNo){
		console.log('travelno'+travelNo);
		return $http({
			'url' :"getTripUsers.ajax",
			'method' : 'POST',
			'data' : travelNo
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('getTripUsers 성공'+JSON.stringify(data));

		}).error(function(){
			console.log('메인 자료받아오기 실패');
		});
	}
	
	
	
	
	
	    /*로그아웃*/
    mainFactory.logout=function(){
    	return $http.post('logout.ajax').success(function() {
    		console.log('logout $http 성공');
    	});
    }
	return mainFactory;

}])

// 타임라인 팩토리
app.factory('timeLineFactory',['$http', function($http){
	
	var timeLineFactory = {};
	
	timeLineFactory.listTimeLine = function(){
		//메인 리스트 ajax로 요청
		return $http({
			//timeLine.ajax로 서버에서  전송 스프링 컨트롤러에서 @Requestmapping timeLine찾아서 실행
			'url' :"timeLine.ajax",
			'method' : 'GET'    		
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

