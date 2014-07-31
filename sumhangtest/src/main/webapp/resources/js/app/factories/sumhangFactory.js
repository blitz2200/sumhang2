


angular.module('sumhangApp')
    .factory('sumhangFactory', ['$http', function($http) {
    	
    var urlBase = '';
    var sumhangFactory = {};
    
    sumhangFactory.loginRequest = function () {
    	
    };
    
   /* sumhangFactory.addMember = function (newMember,file) {    	
    	return $http({
	        	'url' : 'addMember.ajax',
	        	'method' : 'POST',
	        	'headers': {'Content-Type' : 'multipart/form-data'},
	        	'data' : newMember
    		}).success(function (data) {
    			alert(data.name);
    			location.hash = '/login';
    		}).error(function (data) {
    			alert('fail');
    		});
    };*/
    			
    			
    
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

angular.module('sumhangApp').factory('mainFactory',['$http', function($http){
	
	var mainFactory = {};
	
	mainFactory.listMain = function(){
	
		return $http({
			'url' :"main.ajax",
			'method' : 'GET'    		
		}).success(function(data){
			alert('메인 팩토리 성공'+data);
			
		}).error(function(){
			alert('메인 자료받아오기 실패');
		})
	};
	
	return mainFactory;

}])