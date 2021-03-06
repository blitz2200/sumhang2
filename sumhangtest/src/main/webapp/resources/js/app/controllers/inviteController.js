app.controller('InviteController',['$scope','mainFactory','globalFactory',
                                    'modalService','pushInviteFactory',
                                 function ($scope, mainFactory,globalFactory,
                                		 modalService,pushInviteFactory) {
	$scope.serverAddress=globalFactory.serverAddress;	
	var sa=globalFactory.serverAddress;

	invite();
	
	function invite(){
		console.log('인바이트 시작')
		mainFactory.invite(globalFactory.serverAddress)
		.success(function(data){
			console.log('invite 성공 넘어온 데이터는?:'+JSON.stringify(data));
			$scope.inviteTrips=data;
		/*	if($scope.inviteTrips.GENDER='man'){
				$scope.inviteWoman=false;
				$scope.inviteMan=true;
			}else if($scope.inviteTrips.GENDER="woman"){
				$scope.inviteWoman=true;
				$scope.inviteMan=false;
			}*/
			
			
			console.log("invite 메인에 넘길데이타 :" +JSON.stringify($scope.inviteTrips));
		}).error(function(error){
			console.log('error');
		})
				
	}
	
	//초대할 유저새로고침
	$scope.inviteUserRefresh=function(){		
		invite();
	}
	
	
	//여행 초대하기 푸쉬 날리기 버튼 클릭이후 함수
	$scope.goInviteUser=function(inviteUser,inviteUserNick){
		/*alert(inviteUserNick);
			alert(JSON.stringify(inviteUserNick));*/
		var enterTripModalDefaults = {
		          backdrop: true,
		                keyboard: true,
		                modalFade: true,
		                  templateUrl: 'partials/tripDetailDeleteModal.html',
		              };
		     
		     var enterTripModalOptions = {
		                closeButtonText: '취소',
		                actionButtonText: '보내기',
		                headerText: '여행 초대하기',		                
		                bodyText:inviteUserNick+'님에게 여행 초대하기를 보내시겠습니까?'
		            };
		     
		     modalService.showModal(enterTripModalDefaults, enterTripModalOptions).then(function () {
		    	 inviteTripUser(inviteUser);
		          });
		
	
	};
	
	function inviteTripUser(inviteUser){	
			console.log('여행 초대하기 버튼 클릭');
			console.log('여행 초대할 사람 번호'+inviteUser);			
			pushInviteFactory.pushInviteUser(sa,inviteUser)
			.success(function(data){
				
				console.log('여행초대하기 푸시성공');
			}).error(function(error){
				console.log('여행참가하기 푸시실패');
			})
			
		}
	

	 
}]);