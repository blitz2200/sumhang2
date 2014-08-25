app.controller('TimeLineController', ['$scope', '$route','$routeParams',
                                      'tripDetailFactory','timeLineFactory',
                                      'globalFactory','Camera',
                                      'timeLineUploadService','timeLineAddFactory',
                                      function ($scope, $route, $routeParams, 
                                    		  tripDetailFactory, timeLineFactory,
                                    		  globalFactory,Camera,
                                    		  timeLineUploadService,timeLineAddFactory) {


	
	//서버 주소 설정
	var sa=globalFactory.serverAddress;
	$scope.serverAddress=sa;
	
	console.log('timeLine 시작');
	var travelNo = $routeParams.travelNo;	
	//$scope.timeLine = $route.current.locals.timeLine; //resolve에 있는 변수를 scope에 넘겨준다.
	getTravelInfo(travelNo)
	getTimelineList(travelNo);
	
	function getTravelInfo(travelNo) {
		tripDetailFactory.tripDetail(sa,travelNo)
		.success(function(data){
			$scope.tripDetail = data;
		}).error(function (error){
    		console.log('getTravelInfo 실패');
    	});
	}
	
	function getTimelineList(travelNo) {
		timeLineFactory.getTimelineList(sa,travelNo)
		.success(function(data){
			$scope.timelines = data;
		}).error(function (error){
    		console.log('getTimeLine 실패');
    	});
	}
	
	$scope.timeLineReplyList = true;
	$scope.writeTimeLine=false;
	
	
	
	
	/*타임라인글쓰기 카메라*/
			//디비 서버에 넘길 변수 (갤러리나 카메라 둘중하나)
	var timeLinePhotoFile=null;
			//유저사진 하드에 저장할 변수 (갤러리나 카메라 둘중하나) 
	var timeLinePhotoMultipartFile;
	
	$scope.timeLineCapturePhoto=function(){
		timeLineCamera();
	}
	
	  function timeLineCamera(){
		  Camera.getPicture(function(cameraImage) {
			  var documentCameraImage=document.getElementById("documentTimeLine");
			      documentCameraImage.src=cameraImage;
	            $scope.$apply(function() {
	                alert('카메라 사진 경로:'+cameraImage);
	                userPhotoFile = cameraImage.substr(cameraImage.lastIndexOf('/') + 1)+".jpg";
	                userPhotoMultipartFile=cameraImage;
	                alert('디비에 넣을 사진 이름 '+timeLinePhotoFile);
	                alert('서버에 저장할 파일 경로'+timeLinePhotoMultipartFile);
	            });
	        }, function(error) {
	            $scope.$apply(function() {
	                $scope.error = error;
	            });
	        }, {
	            destinationType: Camera.DestinationType.FILE_URL,
	            sourceType: Camera.PictureSourceType.CAMERA,
	            encodingType: Camera.EncodingType.JPEG,
	            quality: 50
	        });
	  }
	  
	  
	//갤러리에서 사진 가져오기
	  $scope.timeLineGalleryPhoto=function(){
		  timeLineGallery();
	  }
	  function timeLineGallery(){
		  Camera.getPicture(function(galleryImage) {	
			  var documentGalleryImage=document.getElementById("documentTimeLine");
		      	  documentGalleryImage.src=galleryImage;
				if (galleryImage.substring(0,21)=="content://com.android") {
          		  photo_split=galleryImage.split("%3A");
          		  galleryImage="content://media/external/images/media/"+photo_split[1];
				}
	            $scope.$apply(function() {
	                alert('갤러리 사진 경로:'+galleryImage);
	                timeLinePhotoFile=galleryImage.substr(galleryImage.lastIndexOf('/') + 1)+".jpg";
	                timeLinePhotoMultipartFile=galleryImage;
	                alert('디비에 넣을 사진 이름 '+timeLinePhotoFile);
	                alert('서버에 저장할 파일 경로'+timeLinePhotoMultipartFile);
	               	                
	            });
	        }, function(error) {
	            $scope.$apply(function() {
	                $scope.error = error;
	            });
	        }, {
	            destinationType: Camera.DestinationType.FILE_URI,
	            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
	            encodingType: Camera.EncodingType.JPEG,
	            quality: 50
	        });
	  }
	  
	  /*타임라인 글쓰기 비지니스 로직*/	  

		/*타임라인 글쓰기*/
		$scope.goAddTimeLine=function(){
			//타임라인 리스트 감추기
			$scope.timeLineReplyList = false;
			$scope.writeTimeLine=true;			
		}
		
		$scope.addTimeLineRequest=function(){
			$scope.submitted = true;
			if($scope.writeTimeLineForm.timelineContextText.$valid){
			
				alert('타임라인 글쓰기 시작')
				var timeLine=$scope.timeLine;
				alert('타임라인 객체 내용:' + JSON.stringify(timeLine));
				if (timeLinePhotoFile != null) {				
					//회원가입 객체에 파일이름 추가 
					timeLine.timeLinePhoto=timeLinePhotoFile;
					timeLine.timeLineSphoto='s_'+timeLinePhotoFile;
					
					alert("사진 파일 추가후 업로드"+JSON.stringify(timeLine));				
					//파일객체 서비스에 전송
					timeLineUploadService.timeLineuploadPhoto(sa,timeLineMultipartFile);	
				}else{
					timeLine.timeLinePhoto="defaultTimeLinePhoto.png";
					timeLine.timeLineSphoto='s_defaultTimeLinePhoto.png';				
				}				
					timeLineAddFactory.timeLineAdd(sa,timeLine,travelNo)
					.success(function(){
						$scope.timeLineReplyList = true;
						$scope.writeTimeLine=false;
					}).error(function(error){
						alert('타임라인 입력 콘트롤러 실패');
					})
			}else{
				alert('내용을 입력하세요');
			}
		}
		
	
	/*로그아웃*/
	$scope.logout=function(){		
		mainFactory.logout(globalFactory.serverAddress).success(function (){
			$scope.location.path('/login');
		});
	}
	
	/*회원정보 수정 라우터*/
	$scope.goModifyMember=function(){
		$scope.location.path('/modifyMember');		
	}
	
	/*회원추천 라우터*/
	$scope.inviteRequest=function(){
		$scope.location.path('/tripManager');		
	}

	
	/*버전정보 라우터*/
	$scope.goVersionInfo=function(){
		$scope.location.path('/versionInfo');		
	}
	
	/*셋팅 라우터*/
	$scope.goSettings=function(){
		$scope.location.path('/settings');		
	}
	
	
	/*타임라인쓰기 라우터*/
	$scope.goAddTrip=function(){
		$scope.location.path('/addTrip');		
	}	
	
	/*메인 라우터*/
	$scope.goMain=function(){
		$scope.location.path('/main');		
	}
	
}]);