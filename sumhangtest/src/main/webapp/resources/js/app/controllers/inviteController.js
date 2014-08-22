app.controller('InviteController',['$scope','mainFactory','globalFactory','pushInviteFactory',
                                 function ($scope, mainFactory,globalFactory,pushInviteFactory) {
	$scope.serverAddress=globalFactory.serverAddress;	
	var sa=globalFactory.serverAddress;

	invite();
	
	function invite(){
		alert('인바이트 시작')
		mainFactory.invite(globalFactory.serverAddress)
		.success(function(data){
			console.log('invite 성공 넘어온 데이터는?:'+JSON.stringify(data));
			$scope.inviteTrips=data;			
			console.log("invite 메인에 넘길데이타 :" +JSON.stringify($scope.inviteTrips));
		}).error(function(error){
			console.log('error');
		})
				
	}
	
	
	//여행 초대하기 푸쉬 날리기 버튼 클릭이후 함수
	$scope.inviteUser=function(inviteUser){
		
			console.log('여행 초대하기 버튼 클릭');
			alert('여행 초대할 사람 번호'+inviteUser);
			
			pushInviteFactory.pushInviteUser(sa,inviteUser)
			.sucess(function(){
				console.log('여행초대하기 푸시성공');
			}).error(function(error){
				console.log('여행참가하기 푸시실패');
			})
			
		}
	

	 
}]);