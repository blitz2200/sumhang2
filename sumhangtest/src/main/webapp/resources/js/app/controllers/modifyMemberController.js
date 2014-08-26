app.controller('ModifyMemberController', ['$scope','$timeout', 'mainFactory', 'userFactory', 'globalFactory',
                                          'Camera','modifyPhotoUploadService',
                                          function ($scope,$timeout,mainFactory,userFactory, globalFactory,
                                        		  Camera,modifyPhotoUploadService) {

	var sa = globalFactory.serverAddress;
	$scope.serverAddress=globalFactory.serverAddress;
	
	
///////////////////////////////////유저사진 변경 //////////////////////////////
	
	//디비 서버에 넘길 변수 (갤러리나 카메라 둘중하나) 
	  var modifyUserPhotoFile=null;
	  //유저사진 하드에 저장할 변수 (갤러리나 카메라 둘중하나) 
	  var modifyUserPhotoMultipartFile;
	 
	 //카메라 켜기 
	 $scope.goModifyUserPhoto=function(){
		  modifyMemberCamera();
		
	  }
	  
	  function modifyMemberCamera(){
		  Camera.getPicture(function(cameraImage) {
			  var documentCameraImage=document.getElementById("modifyMemberUserPhoto");
			      documentCameraImage.src=cameraImage;
	            $scope.$apply(function() {
	                alert('카메라 사진 경로:'+cameraImage);
	                modifyUserPhotoFile = cameraImage.substr(cameraImage.lastIndexOf('/') + 1)+".jpg";
	                modifyUserPhotoMultipartFile=cameraImage;
	                alert('디비에 넣을 수정 사진 이름 '+modifyUserPhotoFile);
	                alert('서버에 저장할 수정 파일 경로'+modifyUserPhotoMultipartFile);
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
	  $scope.goModifyGalleryPhoto=function(){
		  modifyMemberGallery();
	  }
	  function modifyMemberGallery(){
		  Camera.getPicture(function(galleryImage) {	
			  var documentGalleryImage=document.getElementById("modifyMemberUserPhoto");
		      	  documentGalleryImage.src=galleryImage;
				if (galleryImage.substring(0,21)=="content://com.android") {
        		  photo_split=galleryImage.split("%3A");
        		  galleryImage="content://media/external/images/media/"+photo_split[1];
				}
	            $scope.$apply(function() {
	                alert('갤러리 사진 경로:'+galleryImage);
	                modifyUserPhotoFile=galleryImage.substr(galleryImage.lastIndexOf('/') + 1)+".jpg";
	                modifyUserPhotoMultipartFile=galleryImage;
	                alert('디비에 넣을 사진 이름 '+modifyUserPhotoFile);
	                alert('서버에 저장할 파일 경로'+modifyUserPhotoMultipartFile);
	               	                
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
	
	
	////////////////////////////////////유저사진 변경 끝////////////////////////////
	
	
	var suser;

	getUser();
	
	$scope.modifyUserInfo = function (){
		$scope.submitted = true;
		if( $scope.modifyMemberForm.userNickNameModifyInput.$valid 
				&& $scope.modifyMemberForm.userPasswordModifyInput.$valid
		    	&& !($scope.modifiedUserInfo.nickDuplicate)){
			console.log("회원정보 수정 시작됨");
			
			if(modifyUserPhotoFile!=null){
				$scope.modifiedUserInfo.photo=modifyUserPhotoFile;
				$scope.modifiedUserInfo.sPhoto='s_'+modifyUserPhotoFile;
				alert('사진 파일 추가후 수정할 객체:'+JSON.stringify($scope.modifiedUserInfo));
				modifyPhotoUploadService.modifyUploadPhoto(sa,modifyUserPhotoMultipartFile);
			}else{
				$scope.modifiedUserInfo.photo="defaultUserPhoto.png";
				$scope.modifiedUserInfo.sPhoto='s_'+"defaultUserPhoto.png";				
			}			
			
			console.log("$scope.modifiedUserInfo"+JSON.stringify($scope.modifiedUserInfo));
			userFactory.updateUserInfo(sa,$scope.modifiedUserInfo)
			.success(function (){
				console.log("회원정보 수정 성공");
				$timeout(function(){$scope.location.path('main')},4300);
			}).error(function(){
				console.log("회원정보 수정 실패");
			});
		}else{
			alert('양식을 확인해 주세요');
			$scope.modifiedUserInfo.password='';
			$scope.modifiedUserInfo.passwordConfirm='';
		}
	}
	
	function getUser(userNo) {
		userFactory.getSessionUser()
		.success(function(data){
			console.log('getUserdata'+JSON.stringify(data));
			suser=data
			$scope.userInfo=data;
			$scope.modifiedUserInfo.userNo = $scope.userInfo.userNo;
			$scope.modifiedUserInfo.name = $scope.userInfo.name;			
			$scope.modifiedUserInfo.nick = $scope.userInfo.nick;
			$scope.modifiedUserInfo.birth = $scope.userInfo.birth;
			$scope.modifiedUserInfo.photo = $scope.userInfo.photo;
			$scope.modifiedUserInfo.push = $scope.userInfo.push;
			$scope.modifiedUserInfo.invite = $scope.userInfo.invite;
		}).error(function(){
			console.log('getsessionuser 실패');
		});
	}
	
	$scope.nickDuplicateChecking = function (nick){
		console.log('controllerNick:'+nick);
		userFactory.nickDuplicateCheck(sa, nick)
		.success(function(data){
			if(data=='' && suser.nick != $scope.modifiedUserInfo.nick){
				$scope.modifiedUserInfo.nickDuplicate=true;
				console.log('$scope.modifiedUserInfo.nickDuplicate'+$scope.modifiedUserInfo.nickDuplicate);
			}else{
				$scope.modifiedUserInfo.nickDuplicate=false;
				console.log('$scope.modifiedUserInfo.nickDuplicate'+$scope.modifiedUserInfo.nickDuplicate);
			}
		});
		
	}
	
	
	 /*로그아웃*/
	$scope.logout=function(){		
		mainFactory.logout(sa).success(function (){
			$scope.location.path('login');
		});
	}
	
	/*회원정보 수정 라우터*/
	$scope.goModifyMember=function(){
		$scope.location.path('modifyMember');		
	}
	
	/*회원추천 라우터*/
	$scope.inviteRequest=function(){
		$scope.location.path('tripManager');		
	}

	
	/*버전정보 라우터*/
	$scope.goVersionInfo=function(){
		$scope.location.path('versionInfo');		
	}
	
	/*셋팅 라우터*/
	$scope.goSettings=function(){
		$scope.location.path('settings');		
	} 
}]);
