app.controller('JoinMemberController', ['$scope', 'sumhangService','globalFactory', 
                                        function ($scope, sumhangService,globalFactory) {
		
	 var sa=globalFactory.serverAdress;
	  $scope.addMemberRequest = function(){
		  	 $scope.submitted = true;	 
			if( $scope.joinMember.inputIdInput.$valid && $scope.joinMember.inputPassword3Input.$valid																			
		    	&& $scope.joinMember.inputPassword1Input.$valid && $scope.joinMember.nicknameInput.$valid
		    	&& $scope.joinMember.nameInput.$valid&& $scope.joinMember.datepicker1.$valid ){
		
		console.log("회원가입 시작");
		
		var user =$scope.newMember;
		var file=$scope.file;		
	
		console.log('회원가입 내용  :'+JSON.stringify(user));
		
		if (typeof $scope.tripfile == 'undifined') {
			console.log('업로드 파일은 :' + JSON.stringify(file.name));
			
			//파일객체에서 이름을 빼서 userFile에 저장후 substr함수로 따음표 잘라내기
			var userFile= JSON.stringify(file.name)
						  .substr(1,JSON.stringify(file.name).length-2);
			console.log('유저파일은? :'+userFile)
			
			//회원가입 객체에 파일이름 추가 
			user.photo=userFile;	
			
			console.log("사진 파일 추가후 업로드"+JSON.stringify(user));
			
			//파일객체 서비스에 전송
			sumhangService.addFile(sa,file);	
		}else{
			user.photo='1.png';
			alert("디폴트파일이름"+JSON.stringify(user.photo));
			
		}
		
		alert('레지스트리 아이디'+joinUseRegid);
		user.regId=joinUseRegid;
		alert('regid추가후 회원입력 객체 : '+JSON.stringify(user));
		//유저객체 서비스에 전송
		sumhangService.addUser(sa,user);
		
		
		
		$scope.location.path('/login'); 
			}else{
				alert('양식을 입력하세요');
				
			}
				
		}	  
    
}]); 
//회원가입 controller 끝