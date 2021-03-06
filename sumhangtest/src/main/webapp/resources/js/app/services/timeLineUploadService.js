app.service('timeLineUploadService',['$http',function ($http){
    
    
    this.timeLineUploadPhoto = function(sa,timeLinePhotoMultipartFile){
    	console.log('메인상세페이지 편집 여행사진 업로드 서비스 시작');
    	
		  var win = function (r) {
			    console.log("Code = " + r.responseCode);
			    console.log("Response = " + r.response);
			    console.log("Sent = " + r.bytesSent);
		  }
	
		 var fail = function (error) {
			 console.log("An error has occurred: Code = " + error.code);
			    console.log("upload error source " + error.source);
			    console.log("upload error target " + error.target);
		 }
	
	 	var options = new FileUploadOptions();
		  
		  options.fileKey = "timeLinePhoto";
		  options.fileName = timeLinePhotoMultipartFile.substr(timeLinePhotoMultipartFile.lastIndexOf('/') + 1);
		  	
		  console.log('최종 업로드할  수정 여행 파일:'+options.fileName);
		  
		  var ft = new FileTransfer();
		  ft.upload(timeLinePhotoMultipartFile, encodeURI(sa+"timeLineUpload.ajax"), win, fail, options);		
	
    }
  
}]);