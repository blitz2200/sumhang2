app.controller('inviteController',['$scope','mainFactory','globalFactory',
                                 function ($scope, mainFactory,globalFactory) {
	alert('시작1');
	$scope.serverAddress=globalFactory.serverAddress;
	
	var sa=globalFactory.serverAddress;
	$scope.serverAddress=sa;
	
	 
     
	alert('시작');
	invite();
	function invite(){
		alert('왔음');
		mainFactory.invite(globalFactory.serverAddress)
		.success(function(data){
			console.log('invite 성공 넘어온 데이터는?:'+JSON.stringify(data));
			
			$scope.inviteTrips=data;
			
			console.log("invite 메인에 넘길데이타 :" +JSON.stringify($scope.inviteTrips));
		})
		
	}
	
	//초대 푸쉬 날리기
 	$scope.inviteUser=function(){
		pushInviteTrip()
	};
	
	function pushInviteTrip(){
		console.log('여행초대하기 푸시버튼 클릭')
		mainFactory.pushInviteTrip(sa,userNo)
		.sucess(function(){
			console.log('여행초대하기 푸시성공');
		}).error(function(error){
			console.log('여행참가하기 푸시실패');
		})
		
	}
	 
}]);