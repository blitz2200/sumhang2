app.controller('TripManagerController', ['$scope','globalFactory', function ($scope, globalFactory) {
 
	$scope.serverAddress=globalFactory.serverAddress;
    	
 
   	
    /*로그아웃*/
	$scope.logout=function(){		
		mainFactory.logout(globalFactory.serverAdress).success(function (){
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
	
	/*메인 라우터*/
	$scope.goMain=function(){
		$scope.location.path('/main');		
	}
    
}]);