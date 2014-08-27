app.controller('IntroController', ['$scope','userFactory', 'usSpinnerService', 'globalFactory', 
                                   function ($scope, userFactory, usSpinnerService, globalFactory) {
	
	var sa =globalFactory.serverAddress
	
	CarouselDemoCtrl($scope)
	
	function CarouselDemoCtrl($scope) {
		  $scope.myInterval = 5000;
		  
		  $scope.slides=[
		     {image:sa+'/resources/images/15.jpg',
		    	 text:'하하하'},
		    	 
		    	 {image:sa+'/resources/images/16.jpg',
		    		 text:'너에게'},
		    		 {image:sa+'/resources/images/19.jpg',
		    			 text:'필수적인'},
		  ]

		  
		  var slides=$scope.slides;
	}
		
	

	
	function loginCheck(){
		usSpinnerService.spin('spinner-1');
		userFactory.loginCheck(globalFactory.serverAddress)
		.then(function(response){ 
			usSpinnerService.spin('spinner-1');
			console.log(response.isLogged);
			if(response.isLogged){
				$scope.location.path('/main');
			}else{
				$scope.location.path('/login');
			}			
		});
	}
	
	$scope.loginCheck = function () {
		console.log('logincheck invoked.... ');
		loginCheck();
	}	
}]);