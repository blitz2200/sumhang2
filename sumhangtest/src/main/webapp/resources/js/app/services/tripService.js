app.service('tripService', ['$http',function ($http) {
    
    
    this.addTrip = function(sa,trip){
    	$http({
    		method:'POST',
    		url : sa+"addTrip.ajax",
    		data : trip,
    		headers : {'Content-Type':'application/json; charset=utf-8'},    		
    	}).success(function(){
    		console.log("여행 정보 입력 성공")
    	}).error(function(){
    		console.log("여행 정보 입력 실패")
    	})
    }
  
}]);