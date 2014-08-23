app.controller('ModifyMemberController', ['$scope', 'userFactory', 'globalFactory',function ($scope,userFactory, globalFactory) {

	var sa = globalFactory.serverAddress;
	$scope.serverAddress=globalFactory.serverAddress;
	var suser;

	getUser();
	
	$scope.modifyUserInfo = function (){
		$scope.submitted = true;
		if( $scope.modifyMemberForm.userNickNameModifyInput.$valid 
				&& $scope.modifyMemberForm.userPasswordModifyInput.$valid
		    	&& !($scope.modifiedUserInfo.nickDuplicate)){
			console.log("회원정보 수정 시작됨");
			console.log("$scope.modifiedUserInfo"+JSON.stringify($scope.modifiedUserInfo));
			userFactory.updateUserInfo($scope.modifiedUserInfo)
			.success(function (){
				console.log("회원정보 수정 성공");
				$scope.location.path('main');
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
		mainFactory.logout(globalFactory.serverAdress).success(function (){
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
