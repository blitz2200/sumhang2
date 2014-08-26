app.service('tripUploadService',['$http',function($http){
	
	this.addTripGalleryFile=function(sa,tripGalleryPhoto){
		alert('여행사진 업로드 서비스 시작');
	
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
		  
		  options.fileKey = "tripGalleryPhoto";
		  options.fileName = tripGalleryPhoto.substr(tripGalleryPhoto.lastIndexOf('/') + 1);
		  	
		  console.log('최종 업로드할 여행 파일:'+options.fileName);
		  
		  var ft = new FileTransfer();
		  ft.upload(tripGalleryPhoto, encodeURI(sa+"tripGalleryPhoto.ajax"), win, fail, options);		
	
	}
	
}])