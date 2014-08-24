app.service('modifyPhotoUploadService', ['$http',function ($http) {
    
    
    this.modifyUploadPhoto = function(sa,modifyUserPhotoMultipartFile){
    	alert('메인상세페이지 편집 여행사진 업로드 서비스 시작');
    	
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
		  
		  options.fileKey = "modifyUserPhoto";
		  options.fileName = modifyUserPhotoMultipartFile
		  					 substr(modifyUserPhotoMultipartFile.lastIndexOf('/') + 1);
		  	
		  alert('최종 업로드할  수정 여행 파일:'+options.fileName);
		  
		  var ft = new FileTransfer();
		  ft.upload(modifyUserPhotoMultipartFile, encodeURI(sa+"modifyUserPhoto.ajax"), win, fail, options);		
	
    }
  
}]);