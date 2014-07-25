angular.module('sumhangApp')
    .factory('sumhangFactory', ['$http', function($http) {
    	
    var urlBase = '';
    var sumhangFactory = {};
    
    sumhangFactory.loginRequest = function () {
    	return $http.post(urlBase+'/login');
    };
    
    sumhangFactory.addMember = function (newMember) {    	
    	return $http({
	        	'url' : 'addMember.ajax',
	        	'method' : 'POST',
	        	'headers': {'Content-Type' : 'application/json'},
	        	'data' : newMember
    		}).success(function (data) {
    			alert(data.name);
    			location.hash = '/login';
    		}).error(function (data) {
    			alert('fail');
    		});
    };
    			
    			
    
    return sumhangFactory;
}]);