﻿angular.module('sumhangApp')
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
    			
    		});;
    }
    return sumhangFactory;
}]);
    
  /*  sumhangFactory.addMember = function (newMember) {    	
    	return $http({
	        	'url' : 'addMember.ajax',
	        	'method' : 'POST',
	        	'headers': {'Content-Type' : 'application/json'},
	        	'data' : newMember
    		}).success(function (data) {
    			alert(data.name);
    			
    		}).error(function (data) {
    			alert('fail');
    		});
    };*/
    		

/*
angular.module('sumhangApp')
.factory('addTripFactory', ['$http', function($http) {
	
	var urlBase = '';
	var addTripFactory = {};
	
	addTripFactory.addTripRequest = function () {
		return $http.post(urlBase+'/addTrip');
	};
	
	addTripFactory.addTrip = function (newTrip) { 
	    	
		return $http({
	        	'url' : 'addTrip.ajax',
	        	'method' : 'POST',
	        	'headers': {'Content-Type' : 'application/json'},
	        	'data' : newTrip
			}).success(function (data) {
				alert(data.title);
				location.hash = '/main';
			}).error(function (data) {
				alert('fail');
			});
	};
				    
	return addTripFactory;
}]);*/

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