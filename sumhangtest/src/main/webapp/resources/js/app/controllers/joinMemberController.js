app.controller('JoinMemberController', ['$scope', 'userService', 'userFactory',	'globalFactory', 'Camera', 'userPhotoService',
                                        function($scope, userService, userFactory, globalFactory, Camera, userPhotoService) {
			
	var sa = globalFactory.serverAddress;
	$scope.serverAddress=globalFactory.serverAddress;
	
	$scope.idDuplicateChecking = function (userId){
		console.log('controllerUserId:'+userId);
		userFactory.idDuplicateCheck(sa, userId)
		.success(function(data){
			if(data==''){
				$scope.joinMember.idDuplicate=true;
				console.log('$scope.joinMember.idDuplicate'+$scope.joinMember.idDuplicate);
			}else{
				$scope.joinMember.idDuplicate=false;
				console.log('$scope.joinMember.idDuplicate'+$scope.joinMember.idDuplicate);
			}
		});
		
	}
	
	$scope.nickDuplicateChecking = function (nick){
		console.log('controllerNick:'+nick);
		userFactory.nickDuplicateCheck(sa, nick)
		.success(function(data){
			if(data==''){
				$scope.joinMember.nickDuplicate=true;
				console.log('$scope.joinMember.nickDuplicate'+$scope.joinMember.nickDuplicate);
			}else{
				$scope.joinMember.nickDuplicate=false;
				console.log('$scope.joinMember.nickDuplicate'+$scope.joinMember.nickDuplicate);
			}
		});
		
	}
			
			//디비 서버에 넘길 변수 (갤러리나 카메라 둘중하나) 
	  var userPhotoFile=null;
	  //유저사진 하드에 저장할 변수 (갤러리나 카메라 둘중하나) 
	  var userPhotoMultipartFile;
	 
	 //카메라 켜기 
	 $scope.capturePhoto=function(){
		  joinMemberCamera();
		
	  }
	  
	  function joinMemberCamera(){
		  Camera.getPicture(function(cameraImage) {
			  var documentCameraImage=document.getElementById("cameraAfterImg");
			      documentCameraImage.src=cameraImage;
	            $scope.$apply(function() {
	            	console.log('카메라 사진 경로:'+cameraImage);
	                userPhotoFile = cameraImage.substr(cameraImage.lastIndexOf('/') + 1)+".jpg";
	                userPhotoMultipartFile=cameraImage;
	                console.log('디비에 넣을 사진 이름 '+userPhotoFile);
	                console.log('서버에 저장할 파일 경로'+userPhotoMultipartFile);
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
			  var documentGalleryImage=document.getElementById("cameraAfterImg");
		      	  documentGalleryImage.src=galleryImage;
				if (galleryImage.substring(0,21)=="content://com.android") {
          		  photo_split=galleryImage.split("%3A");
          		  galleryImage="content://media/external/images/media/"+photo_split[1];
				}
	            $scope.$apply(function() {
	            	console.log('갤러리 사진 경로:'+galleryImage);
	                userPhotoFile=galleryImage.substr(galleryImage.lastIndexOf('/') + 1)+".jpg";
	                userPhotoMultipartFile=galleryImage;
	                console.log('디비에 넣을 사진 이름 '+userPhotoFile);
	                console.log('서버에 저장할 파일 경로'+userPhotoMultipartFile);
	               	                
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
			
	  $scope.addMemberRequest = function(){
		  	 $scope.submitted = true;	 
			if( $scope.joinMember.userIdJoinInput.$valid 
				&& $scope.joinMember.userPswdJoinInput.$valid																			
		    	&& $scope.joinMember.userPswdCheckInput.$valid && $scope.joinMember.userNickJoinInput.$valid
		    	&& $scope.joinMember.userNameJoinInput.$valid&& $scope.joinMember.datepicker1.$valid
		    	&& !($scope.joinMember.idDuplicate) && !($scope.joinMember.nickDuplicate)){
		
		console.log("회원가입 시작");
		
		var user =$scope.newMember;
		//var file=$scope.file;		
	
		console.log('회원가입 내용  :'+JSON.stringify(user));
		
		if (userPhotoFile  != null) {			
			
			//회원가입 객체에 파일이름 추가 
			user.photo=userPhotoFile;
			user.sPhoto='s_'+userPhotoFile;
			
			console.log("사진 파일 추가후 업로드"+JSON.stringify(user));
			
			//파일객체 서비스에 전송
			userPhotoService.uploadPhoto(sa,userPhotoMultipartFile);	
		}else{
			user.photo="defaultUserPhoto.png"
			user.sPhoto='s_defaultUserPhoto.png'
			console.log("디폴트파일이름"+JSON.stringify(user.photo));
			
		}
		
		console.log('레지스트리 아이디'+joinUseRegid);
		user.regId=joinUseRegid;
		console.log('regid추가후 회원입력 객체 : '+JSON.stringify(user));
		//유저객체 서비스에 전송
		userService.addUser(sa,user);
		
		
		
		$scope.location.path('/login'); 
			}else{
				alert('양식을 확인해 주세요');
				$scope.newMember.password='';
				$scope.newMember.password1='';
				
			}
				
		}
} ]);