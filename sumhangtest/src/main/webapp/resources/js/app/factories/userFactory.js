//유저팩토리
app.factory('userFactory', ['$http', function($http) {
    	
    var urlBase = '';
    var userFactory = {};   
    
    userFactory.loginCheck = function (sa) {    	
  
    	return $http({
    			'url' : sa+'loginCheck.ajax',
    			'method' : 'POST',
    			'headers': {'Content-Type' : 'application/json'}	
    		}).success(function (data) {
    			console.log('$http 성공');
    			console.log(data);
    		}).error(function () {
    			
    		});
    }
        
    userFactory.loginRequest = function (sa,loginInfo) {    	
    	return $http({
    			'url' :sa+ 'login.ajax',
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
			'url' : 'http://192.168.0.72:8080/getSessionUser.ajax',
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