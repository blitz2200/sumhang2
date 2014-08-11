
//여행 세부 게시판 시작
//main페이지에서 tboard_no를 a링크에 넣어서 보냄  
//app.js파일에  when주소뒤에 :스코프이름 으로 넘긴걸 받음 
//콘트롤러에서  $routeParams를 사용 이것을 받아서 사용 가능  
app.controller('TripDetailController', ['$scope','$routeParams','tripDetailFactory',
                                        function ($scope,$routeParams ,tripDetailFactory) {
	
	
	//넘어온 tboard_no,tripDetailReply값  변수에 저장
	
	var travelNo=$routeParams.travelNo;	
	
	
	//tripDetail함수에 변수값 전달후 실행
	tripDetail(travelNo);
	//tripDetailReply 함수 실행 
	tripDetailListReply(travelNo);
	
	
	//tripDetail 페이지 시작 
	function tripDetail(travelNo){
		console.log('tripDetail 시작');			
		console.log('넘어온 tboardNo는:'+travelNo);		
		
		tripDetailFactory.tripDetail(travelNo)
		.success(function(data){    		
			
			console.log('디비에서 꺼내온 main detail 출력용 data:'+JSON.stringify(data));
    		
			$scope.trip=data;
			
			console.log("HTML예 출력할 데이타 :" +JSON.stringify($scope.trip));
    		
    	}).error(function (error){
    		console.log('실패');
    		
    	});
	}//tripDetail 끝
	
	$scope.mainTripDetail=true;
	
	
	//리플 리스트 시작
	function tripDetailListReply(travelNo){
		console.log('tripDetailReply 시작')
		tripDetailFactory.tripDetailListReply(travelNo)
	
		.success(function(data){
			console.log('디비에서 꺼내온 main detail reply data:'+JSON.stringify(data));
		
			$scope.replys=data;
			console.log('html에 출력할 리플라이 데이타 '+JSON.stringify($scope.replys));
		}).error(function(error){
			console.log('tripDetailReply 콘트롤러 실패');
		})
	}
	
	
	
	//tripDetail 답변 게시판 시작
	
	$scope.goTripDetailReply=function(){
		tripDetailReply();
	}
	
	
	
	function tripDetailReply(){
		console.log('trpDetail 리플 입력 함수 시작');
		var tripDetailData=$scope.tripDetailReply;
			
		console.log('받아온 tripDetailReply 값은: '+tripDetailData);
		console.log('받아온 travelNo 값은: '+travelNo);
		tripDetailFactory.tripDetailReply(tripDetailData,travelNo)
		.success(function(){
			console.log('메인상세 리플 입력완료')
			tripDetailListReply(travelNo);
		}).error(function(error){
			console.log('메인상세 리플 입력 실패')
		})
	}
	

	//tripDetail 리플 삭제 시작
	$scope.goDelTripDetailRe=function(tripDetailReNo){
		delTripDetailRe(tripDetailReNo);
	}
	
	function delTripDetailRe(tripDetailReNo){
		console.log('delTripDetailRe 리플 삭제 함수 시작');
		console.log('delTripDetailRe 리플 변수: '+tripDetailReNo)
		tripDetailFactory.delTripDetailRe(tripDetailReNo)
		.success(function(data){
			tripDetailListReply(travelNo);
			console.log('컨트롤러 메인상세 리플 삭제 완료')
			
		}).error(function(error){
			console.log('콘트롤러 리플 삭제 실패');
		})
	}
	
	
	//tripDetail 리플 수정 시작
	
		$scope.inputRe=true;
		$scope.editRe=false;
		
		$scope.goEditTripDetailRe=function(tripDetailReNo){
			editTripDetailRe(tripDetailReNo);
			
		}
		//수정 데이타 폼에넘길 리플 번호 변수
		var tripDetailReplyNumber ;
		
		//수정 폼으로 바꾸고 수정 데이타 폼에넘길 리플 번호 변수 입력
		function editTripDetailRe(tripDetailReNo){
			console.log('리플 수정 폼 나오기 컨트롤러  시작');
			console.log('리플 수정 번호 : '+tripDetailReNo)
			tripDetailReplyNumber = tripDetailReNo;
			$scope.inputRe=false;
			$scope.editRe=true;	
		}
		
		//리플 수정 내용 서버랑 연동 시작
		$scope.goTripDetailReplyEdit=function(){
			console.log(tripDetailReplyNumber);
			tripDetailReplyEdit(tripDetailReplyNumber);			
		}
		
		
		function tripDetailReplyEdit(tripDetailReNo){
			console.log('리플 수정 컨트롤러 시작');
			console.log('수정할 리플 번호'+tripDetailReNo);
			var tripDetailReEditDescription=$scope.tripDetailReEditDescription
			console.log('수정할 리플 내용' + tripDetailReEditDescription);
			tripDetailFactory.tripDetailReplyEdit(tripDetailReNo,tripDetailReEditDescription)
			.success(function(){
				console.log('메인상세 리플 수정 콘트롤러 완료')
				tripDetailListReply(travelNo);
				$scope.inputRe=true;
				$scope.editRe=false;
						
			}).error(function(error){
				console.log('메인상세 리플 수정 콘트롤러 실패')
			})
		}
	
}]);