app.controller('IntroController', ['$scope','userFactory','globalFactory', 
                                   function ($scope, userFactory,globalFactory) {
	
	CarouselDemoCtrl($scope)
	
	function CarouselDemoCtrl($scope) {
		  $scope.myInterval = 5000;
		  
		  $scope.slides=[
		     {image:'http://192.168.0.88:8080/resources/images/tripPhotoFile/1818.jpg',
		    	 text:'하하하'},
		    	 
		    	 {image:'http://192.168.0.88:8080/resources/images/tripPhotoFile/1820.jpg',
		    		 text:'너에게'},
		    		 {image:'http://192.168.0.88:8080/resources/images/tripPhotoFile/1831.jpg',
		    			 text:'필수적인'},
		  ]
		  /*var slides = $scope.slides = [];
		  $scope.addSlide = function() {
		    var newWidth = 400 
		    slides.push({
		      image: 'http://192.168.0.88:8080/resources/images/tripPhotoFile/' + newWidth + '/300',
		     // http://192.168.0.88:8080/resources/images/tripPhotoFile/
		      text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
		        ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
		    });
		  };
		  for (var i=0; i<4; i++) {
		    $scope.addSlide();
		  }*/
		  
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