app.controller('IntroController', ['$scope','userFactory','globalFactory', 
                                   function ($scope, userFactory,globalFactory) {
	
	function loginCheck(){
		userFactory.loginCheck(globalFactory.serverAdress)
		.success(function(data){ 
			
			console.log(data.isLogged);
			if(data.isLogged){
				$scope.location.path('/main');
			}else{
				$scope.location.path('/login');
			}
			
		}).error(function (error){
		
		});
	}
	
	$scope.loginCheck = function () {
		console.log('logincheck invoked.... ');
		loginCheck();
	}	
}]);