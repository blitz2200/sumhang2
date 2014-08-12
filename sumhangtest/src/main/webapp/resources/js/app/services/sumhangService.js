//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('sumhangService', ['$http',function ($http) {
    
	/*유저파일 업로드 시작*/
    this.addFile = function(sa,file){
    	var fd = new FormData();
    	fd.append('file',file);    	    	
    	$http({
    	 method:'POST',
    	 url : sa+"addFile.ajax",
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
    
    this.addUser = function(sa,user){
    	$http({
    		method:'POST',
    		url :sa+"addUser.ajax",
    		data : user,
    		headers : {'Content-Type':'application/json charset=utf-8'},    		
    	}).success(function(){
    		alert("회원가입 성공")
    	}).error(function(){
    		alert("회원가입 실패")
    	})
    };	//유저 파일 업로드 끝
    
    
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
    };		
    
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
    };
  
}]);	//여행 파일 업로드 끝