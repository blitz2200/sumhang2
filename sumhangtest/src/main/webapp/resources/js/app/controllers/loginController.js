app.controller('LoginController', ['$scope','userFactory','usSpinnerService','globalFactory', 
                                     function ($scope, userFactory, usSpinnerService, globalFactory) {
    
    
    function loginRequest(loginInfo){
    	
    	usSpinnerService.spin('spinner-1');
    	userFactory.loginRequest(globalFactory.serverAddress,loginInfo)
    	.then(function(response){
    		usSpinnerService.stop('spinner-1');
    		console.log(response);
			if(response == ""){
				alert('아이디와 비밀번호를 확인해 주세요');
				$scope.location.path('/login');
			}else{
				$scope.location.path('/main');
			}    		
    	});
    	    	
    }

    $scope.loginRequest = function () {
    	$scope.submitted = true;
    	if( $scope.loginForm.username.$valid && $scope.loginForm.password.$valid){
    	console.log('loginInfo :' + $scope.loginInfo);
        loginRequest($scope.loginInfo);
    	}
    	
    };
}]);