app.service('tripService', ['$http',function ($http) {
    
	/*여행 파일 업로드*/
    this.addTripFile = function(sa,tripfile){
    	var fd1 = new FormData();
    	fd1.append('tripfile',tripfile);    	    	
    	$http({
    	 method:'POST',
    	 url : sa+"addTripFile.ajax",
    	 data : fd1,
    	 transformRequest:angular.identify,
    	 headers:{'Content-Type':undefined}
    	})
    	.success(function(){
    		alert("파일업로드 성공");
    	})
    	.error(function(){
    		alert("파일업로드  실패")
    	});
    }
    
    this.addTrip = function(sa,trip){
    	$http({
    		method:'POST',
    		url : sa+"addTrip.ajax",
    		data : trip,
    		headers : {'Content-Type':'application/json; charset=utf-8'},    		
    	}).success(function(){
    		alert("여행 정보 입력 성공")
    	}).error(function(){
    		alert("여행 정보 입력 실패")
    	})
    }
  
}]);