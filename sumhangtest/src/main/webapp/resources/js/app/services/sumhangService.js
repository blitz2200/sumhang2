//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('sumhangService', ['$http',function ($http) {
    
	/*유저파일 업로드 시작*/
    this.addFile = function(file,uploadUrl){
    	var fd = new FormData();
    	fd.append('file',file);    	    	
    	$http({
    	 method:'POST',
    	 url : uploadUrl,
    	 data : fd,
    	 transformRequest:angular.identify,
    	 headers:{'Content-Type':undefined}
    	})
    	.success(function(){
    		alert("파일업로드 성공");
    	})
    	.error(function(){
    		alert("파일업로드  실패")
    	});
    };
    
    this.addUser = function(user,userUrl){
    	$http({
    		method:'POST',
    		url : userUrl,
    		data : user,
    		headers : {'Content-Type':'application/jason'},    		
    	}).success(function(){
    		alert("회원가입 성공")
    	}).error(function(){
    		alert("회원가입 실패")
    	})
    };	//유저 파일 업로드 끝
    
    
    /*여행 파일 업로드*/
    this.addTripFile = function(tripfile,uploadUrl){
    	var fd1 = new FormData();
    	fd1.append('tripfile',tripfile);    	    	
    	$http({
    	 method:'POST',
    	 url : uploadUrl,
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
    };		
    
    this.addTrip = function(trip,tripUrl){
    	$http({
    		method:'POST',
    		url : tripUrl,
    		data : trip,
    		headers : {'Content-Type':'application/jason'},    		
    	}).success(function(){
    		alert("여행 파일업로드 성공")
    	}).error(function(){
    		alert("여행 파일업로드 실패")
    	})
    };
}]);	//여행 파일 업로드 끝