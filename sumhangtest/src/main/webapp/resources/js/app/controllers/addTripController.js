app.controller('AddTripController', ['$scope','$timeout',  'tripService','globalFactory',
                                     'Camera','tripUploadService',
                                     function ($scope,$timeout, tripService,
                                    		 globalFactory,Camera,tripUploadService) {
	
	var sa=globalFactory.serverAddress;
	$scope.serverAddress=sa;
	//갤러리 사진을 디비에 저장할 변수
	var tripGalleryFile=null;
	//갤러리 사진을 서버에 저장할 파일 변수
	var tripGalleryMultipartFile;
	//여행 등록하기 갤러리 아이콘 선택시 실행됨 
	$scope.goGalleryPhoto=function(){
		addTripGallery();
	}
	
	function addTripGallery(){
		Camera.getPicture(function(galleryImage) {
			var documentEditGalleryFile=document.getElementById('tripFileUpdate');
			documentEditGalleryFile.src=galleryImage;
            $scope.$apply(function() {
            	if (galleryImage.substring(0,21)=="content://com.android") {
            		  photo_split=galleryImage.split("%3A");
            		  galleryImage="content://media/external/images/media/"+photo_split[1];
            	}
            	console.log('갤러리 사진 경로:'+galleryImage);
                tripGalleryFile=galleryImage.substr(galleryImage.lastIndexOf('/') + 1)+".jpg";
                tripGalleryMultipartFile=galleryImage;
                console.log('디비에 넣을 사진 이름 '+ tripGalleryFile);
                console.log('서버에 저장할 파일 경로'+tripGalleryMultipartFil);	                
            });
        }, function(error) {
            $scope.$apply(function() {
                $scope.error = error;
            });
        }, {
            destinationType: Camera.DestinationType.FILE_URL,
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            encodingType: Camera.EncodingType.JPEG,
            quality: 50
        });
  }	
	//여행 등록하기 
	
    $scope.addTripRequest = function () {
    	$scope.submitted = true;    	
    	
    	if( $scope.addTripForm.tripTitleInput.$valid && $scope.addTripForm.tripDestinationInput.$valid
    		&& $scope.addTripForm.datepicker3.$valid && $scope.addTripForm.datepicker4.$valid
    		&& $scope.addTripForm.tripNumberInputAddTrip.$valid ){
    	
    	
    	console.log("여행참가신청 시작...");
    	
    	var trip =$scope.newTrip;		
		
		
    	
			if ( tripGalleryFile != null) {
		console.log('업로드 파일은 :' + tripGalleryFile);		
			
			//여행등록 객체에 파일이름 추가 
			trip.travelPho=tripGalleryFile;
			trip.travelSphoto="s_"+tripGalleryFile;
			
			console.log("사진 파일 추가후 업로드"+JSON.stringify(trip));
				
				//파일객체 서비스에 전송
		
			
			tripUploadService.addTripGalleryFile(sa,tripGalleryMultipartFile);
			
		}else{
			trip.travelPho='defaultTripPhoto.png';
			trip.travelSphoto='s_DefaultTripPhoto.png'
			console.log("디폴트파일이름"+JSON.stringify(trip.travelPho));
			
		}
		
			console.log('여행 등록 내용  :'+JSON.stringify(trip));
		//여행객체 서비스에 전송
		tripService.addTrip(sa,trip);
		$timeout(function(){
			$scope.location.path('/main')},5000);  
		}else{
			alert('양식을 입력하세요');
		}
    	
    }
}]);