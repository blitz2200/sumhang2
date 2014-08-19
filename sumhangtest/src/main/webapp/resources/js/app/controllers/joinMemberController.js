app.controller('JoinMemberController', ['$scope', 'sumhangService','globalFactory','Camera','userPhotoService',
                                        function ($scope, sumhangService,globalFactory,Camera,userPhotoService) {
	//서버 주소 가져오기
	 var sa=globalFactory.serverAddress;
	 $scope.serverAddress=globalFactory.serverAddress;
	 
	 //디비 서버에 넘길 변수 (갤러리나 카메라 둘중하나) 
	  var userPhotoFile;
	  //유저사진 하드에 저장할 변수 (갤러리나 카메라 둘중하나) 
	  var userPhotoMultipartFile;
	  
	 //카메라 켜기 
	 $scope.capturePhoto=function(){
		  joinMemberCamera();
		
	  }
	  
	  function joinMemberCamera(){
		  Camera.getPicture(function(cameraImage) {
	            $scope.$apply(function() {
	                $scope.imageData = cameraImage;
	                alert('카메라 사진 경로:'+cameraImage);
	                userPhotoFile = cameraImage.substr(cameraImage.lastIndexOf('/') + 1)+".jpg";
	                userPhotoMultipartFile=cameraImage;
	                //userPhotoService.uploadPhoto(sa,image);
	                alert('디비에 넣을 사진 이름 '+userPhotoFile);
	                alert('서버에 저장할 파일 경로'+userPhotoMultipartFile);
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
	  $scope.galleryPhoto=function(){
		  joinMemberGallery();
	  }
	  function joinMemberGallery(){
		  Camera.getPicture(function(galleryImage) {
	            $scope.$apply(function() {
	               // $scope.imageData = image;
	                alert('갤러리 사진 경로:'+galleryImage);
	                userPhotoFile=galleryImage.substr(galleryImage.lastIndexOf('/') + 1)+".jpg";
	                userPhotoMultipartFile=galleryImage;
	                alert('디비에 넣을 사진 이름 '+userPhotoFile);
	                alert('서버에 저장할 파일 경로'+userPhotoMultipartFile);
	                //alert(JSON.stringify($scope.imageData));
	                //uploadPhoto(image);
	                //sumhangService.addUserPhoto(sa,image);	                
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
	  
	  
	  $scope.addMemberRequest = function(){
		  	 $scope.submitted = true;	 
			if( $scope.joinMember.inputIdInput.$valid && $scope.joinMember.inputPassword3Input.$valid																			
		    	&& $scope.joinMember.inputPassword1Input.$valid && $scope.joinMember.nicknameInput.$valid
		    	&& $scope.joinMember.nameInput.$valid&& $scope.joinMember.datepicker1.$valid ){
		
		console.log("회원가입 시작");
		
		var user =$scope.newMember;
		//var file=$scope.file;		
	
		console.log('회원가입 내용  :'+JSON.stringify(user));
		
		if (typeof userPhotoFile  != 'undifined') {			
			
			//회원가입 객체에 파일이름 추가 
			user.photo=userPhotoFile;	
			
			console.log("사진 파일 추가후 업로드"+JSON.stringify(user));
			
			//파일객체 서비스에 전송
			userPhotoService.uploadPhoto(sa,userPhotoMultipartFile);	
		}else{
			user.photo='1.png';
			alert("디폴트파일이름"+JSON.stringify(user.photo));
			
		}
		
		alert('레지스트리 아이디'+joinUseRegid);
		user.regId=joinUseRegid;
		alert('regid추가후 회원입력 객체 : '+JSON.stringify(user));
		//유저객체 서비스에 전송
		sumhangService.addUser(sa,user);
		
		
		
		$scope.location.path('/login'); 
			}else{
				alert('양식을 입력하세요');
				
			}
				
		}	 
	  
    
}]); 
//회원가입 controller 끝