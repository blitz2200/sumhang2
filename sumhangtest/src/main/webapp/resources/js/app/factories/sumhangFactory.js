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
}]);