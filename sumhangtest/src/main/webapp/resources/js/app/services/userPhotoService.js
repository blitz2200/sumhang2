app.service('userPhotoService',['$http',function($http){
	
	
/*	this.uploadPhoto=function(sa,userPhoto){
		alert("팩토리에 넘어온 유저사진"+userPhoto);
		var fd = new FormData();
		fd.append('userPhoto',userPhoto);
		$http({
			method:'POST',
			url : sa+"userPhoto.ajax" ,
			data : fd,
	    	transformRequest:angular.identify,
	    	headers:{'Content-Type':undefined}
		}).success(function(){
			alert("유저사진 업로드 성공");
		}).error(function(){
			alert("유저 사진 업로드 실패");
		});
	};*/
		
		
		
	this.uploadPhoto=function(sa,userPhoto){
		alert('유저사진 업로드 팩토리 시작');
	
		  var win = function (r) {
			    console.log("Code = " + r.responseCode);
			    console.log("Response = " + r.response);
			    console.log("Sent = " + r.bytesSent);
		  }
	
		 var fail = function (error) {
			    alert("An error has occurred: Code = " + error.code);
			    console.log("upload error source " + error.source);
			    console.log("upload error target " + error.target);
		 }
	
	 	var options = new FileUploadOptions();
		  
		  options.fileKey = "userPhoto";
		  options.fileName = userPhoto.substr(userPhoto.lastIndexOf('/') + 1);
		  	
		  alert(options.fileName);
		  
		  var ft = new FileTransfer();
		  ft.upload(userPhoto, encodeURI(sa+"userPhoto.ajax"), win, fail, options);		
	
	}
	
}])