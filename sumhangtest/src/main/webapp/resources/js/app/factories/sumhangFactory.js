angular.module('sumhangApp')
    .factory('sumhangFactory', ['$http', function($http) {
    	
    var urlBase = '';
    var sumhangFactory = {};   
    
    sumhangFactory.loginCheck = function () {    	
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
        
    sumhangFactory.loginRequest = function (loginInfo) {    	
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
    return sumhangFactory;
}]);


//메인 리스트 팩토리 
angular.module('sumhangApp').factory('mainFactory',['$http', function($http){
	
	var mainFactory = {};
	
	mainFactory.listMain = function(){
		//메인 리스트 ajax로 요청
		return $http({
			//main.ajax로 서버에서  전송 스프링 컨트롤러에서 @Requestmapping main찾아서 실행
			'url' :"main.ajax",
			'method' : 'GET'    		
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('메인 팩토리 성공'+data);
			
		}).error(function(){
			console.log('메인 자료받아오기 실패');
		})
	};
	//컨트롤러에 작업 완료후 객체 넘겨주기 
	return mainFactory;

}])

angular.module('sumhangApp')
.factory('timeLineFactory',['$http', function($http){
	
	var timeLineFactory = {};
	
	timeLineFactory.listTimeLine = function(){
		//메인 리스트 ajax로 요청
		return $http({
			//timeLine.ajax로 서버에서  전송 스프링 컨트롤러에서 @Requestmapping timeLine찾아서 실행
			'url' :"timeLine.ajax",
			'method' : 'GET'    		
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('타임 라인 가져오기 성공'+data);
			
		}).error(function(){
			console.log('타임 라인 받아오기 실패');
		})
	};
	//컨트롤러에 작업 완료후 객체 넘겨주기 
	return timeLineFactory;

}])

angular.module('sumhangApp')
.factory('tripDetailFactory',['$http', function($http){
	
	var tripDetailFactory = {};
	
	tripDetailFactory.tripDetail = function(travelNo){
		//메인 리스트 ajax로 요청
		alert('팩토리에 넘어온 travelNo:'+travelNo)
		return $http({
			'url' :"tripDetail.ajax",
			'method' : 'POST',
			'data' : {'travelNo':travelNo}
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('여행 세부 게시판 가져오기 성공'+data);
			
		}).error(function(){
			console.log('여행 세부 게시판 받아오기 실패');
		})
	};
	//컨트롤러에 작업 완료후 객체 넘겨주기 
	return tripDetailFactory;

}])