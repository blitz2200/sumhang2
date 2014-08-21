app.factory('userFactory', ['$http', function($http) {
    	
    var userFactory = {};
    
    //로그인 체크
    userFactory.loginCheck = function (sa) {  
    	return $http({
    			'url' : sa+'loginCheck.ajax',
    			'method' : 'POST',
    			'headers': {'Content-Type' : 'application/json; charset=utf-8'}	
    		}).success(function (data) {
    			console.log('$http 성공');
    			console.log(data);
    		}).error(function () {
    			
    		});
    }
    
    
	userFactory.duplicateCheck = function(sa, userId){
		return $http({
				'method' : 'POST',
				'url' : sa + "duplicateCheck.ajax",
				'headers' : {'Content-Type' : 'application/json; charset=utf-8'},			
				'cache' : false,
				'data' : userId			
			}).success(function(data) {			
				console.log("duplicateCheck http성공")
				console.log('successdata'+JSON.stringify(data));
			}).error(function(e) {
				console.log("duplicateCheck http실패")
			});
	}
    
	//로그인 요청
    userFactory.loginRequest = function (sa,loginInfo) {    	
    	return $http({
    			'url' :sa+ 'login.ajax',
    			'method' : 'POST',
    			'headers': {'Content-Type' : 'application/json;; charset=utf-8'},
	        	'data' : {'username': loginInfo.id ,
	        			'password' : loginInfo.password }    		
    		}).success(function (data) {
    			console.log('loginRequest $http 성공');
    			console.log(data);
    			
    		}).error(function () {
    			
    		});
    }
    
    //세션유져가져오기
    userFactory.getSessionUser = function (){
    	return $http({
			'url' : 'http://192.168.0.18:8080/getSessionUser.ajax',
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