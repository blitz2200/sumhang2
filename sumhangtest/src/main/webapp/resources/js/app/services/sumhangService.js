//This handles retrieving data and is used by controllers. 3 options (server, factory, provider) with 
//each doing the same thing just structuring the functions/data differently.
app.service('sumhangService', ['$http',function ($http) {
    
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
    }
}]);