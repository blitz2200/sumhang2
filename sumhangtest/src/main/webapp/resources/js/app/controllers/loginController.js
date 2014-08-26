app.controller('LoginController', ['$scope','userFactory','globalFactory', 
                                     function ($scope, userFactory,globalFactory) {
    
    
    function loginRequest(loginInfo){
    	
    	
    	userFactory.loginRequest(globalFactory.serverAddress,loginInfo)
    	.success(function(data){
    		
    		console.log(data);
			if(data == ""){
				console.log('아이디와 비밀번호를 확인해 주세요');
				$scope.location.path('/login');
			}else{
				$scope.location.path('/main');
			}
    		
    	}).error(function (error){
    		
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