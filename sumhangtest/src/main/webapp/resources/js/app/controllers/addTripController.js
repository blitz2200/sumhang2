app.controller('AddTripController', ['$scope',  'sumhangService','globalFactory', 
                                     function ($scope, sumhangService,globalFactory) {
	
	var sa=globalFactory.serverAddress;
    $scope.addTripRequest = function () {
    	$scope.submitted = true;
    	
    	
    	
    	if( $scope.addTripForm.tripTitleInput.$valid && $scope.addTripForm.tripDestinationInput.$valid
    		&& $scope.addTripForm.datepicker3.$valid && $scope.addTripForm.datepicker4.$valid
    		&& $scope.addTripForm.tripNumberInputAddTrip.$valid ){
    	
    	
    	console.log("여행참가신청 시작...");
    	
    	var trip =$scope.newTrip;		
		
		var tripfile=$scope.tripfile;		
    	
			if (typeof $scope.tripfile != 'undefined') {
		console.log('업로드 파일은 :' + JSON.stringify(tripfile.name));
    	
			//파일객체에서 이름을 빼서 tripFile에 저장후 substr함수로 따음표 잘라내기
			var tripFile= JSON.stringify(tripfile.name)
						  .substr(1,JSON.stringify(tripfile.name).length-2);
			console.log('여행파일은? :'+tripFile)
			
			//여행등록 객체에 파일이름 추가 
			trip.travelPho=tripFile;	
			
			console.log("사진 파일 추가후 업로드"+JSON.stringify(trip));
				
				//파일객체 서비스에 전송
		
			sumhangService.addTripFile(sa,tripfile);
			
		}else{
			trip.travelPho='1.png';
			alert("디폴트파일이름"+JSON.stringify(trip.travelPho));
			
		}
		
		alert('여행 등록 내용  :'+JSON.stringify(trip));
		//여행객체 서비스에 전송
		sumhangService.addTrip(sa,trip);
		$scope.location.path('/main');  
		}else{
			alert('양식을 입력하세요');
		}
    	
    }
}]);