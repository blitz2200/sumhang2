app.controller('IntroController', ['$scope','userFactory','globalFactory', 
                                   function ($scope, userFactory,globalFactory) {
	
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
		userFactory.loginCheck(globalFactory.serverAddress)
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