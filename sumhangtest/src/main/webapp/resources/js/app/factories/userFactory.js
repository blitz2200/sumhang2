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
        
	userFactory.idDuplicateCheck = function(sa, userId){
		return $http({
				'method' : 'POST',
				'url' : sa + "idDuplicateCheck.ajax",
				'headers' : {'Content-Type' : 'application/json; charset=utf-8'},			
				'cache' : false,
				'data' : userId			
			}).success(function(data) {			
				console.log("idDuplicateCheck http성공")
				console.log('successdata'+JSON.stringify(data));
			}).error(function(e) {
				console.log("idDuplicateCheck http실패")
			});
	}
	
	userFactory.nickDuplicateCheck = function(sa, nick){
		return $http({
				'method' : 'POST',
				'url' : sa + "nickDuplicateCheck.ajax",
				'headers' : {'Content-Type' : 'application/json; charset=utf-8'},			
				'cache' : false,
				'data' : nick			
			}).success(function(data) {			
				console.log("nickDuplicateCheck http성공")
				console.log('successdata'+JSON.stringify(data));
			}).error(function(e) {
				console.log("nickdDplicateCheck http실패")
			});
	}
    
	//로그인 요청
    userFactory.loginRequest = function (sa,loginInfo) {    	
    	return $http({
    			'url' :sa+ 'login.ajax',
    			'method' : 'POST',
    			'headers': {'Content-Type' : 'application/json; charset=utf-8'},
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
			'url' : 'http://192.168.0.72:8080/getSessionUser.ajax',
			'method' : 'POST',
			'headers': {'Content-Type' : 'application/json; charset=utf-8'}        	   		
		}).success(function (data) {
			console.log('getSessionUser $http 성공');
			console.log(data);			
		}).error(function () {			
		});
    }
    
  //유저정보 업데이트
    userFactory.updateUserInfo = function (sa,modifiedUserInfo){
    	return $http({
			'url' : sa+'updateUserInfo.ajax',
			'method' : 'POST',
			'headers': {'Content-Type' : 'application/json; charset=utf-8'},
			'data' : modifiedUserInfo
		}).success(function () {
			console.log('updateUserInfo $http 성공');	
		}).error(function () {
			console.log('updateUserInfo $http 실패');
		});
    }
    
    
    return userFactory;
}]);