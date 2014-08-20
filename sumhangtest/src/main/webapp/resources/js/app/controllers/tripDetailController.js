
//여행 세부 게시판 시작
//main페이지에서 tboard_no를 a링크에 넣어서 보냄  
//app.js파일에  when주소뒤에 :스코프이름 으로 넘긴걸 받음 
//콘트롤러에서  $routeParams를 사용 이것을 받아서 사용 가능  
app.controller('TripDetailController', ['$scope','$routeParams', 'tripDetailFactory',
                                        'tripService', 'modalService', 'globalFactory',
                                        function ($scope,$routeParams, tripDetailFactory,
                                        		  tripService, modalService, globalFactory) {
	
	
	//넘어온 tboard_no,tripDetailReply값  변수에 저장
	
	var travelNo=$routeParams.travelNo;	
	
	//서버 주소 설정
	var sa=globalFactory.serverAddress;
	$scope.serverAddress=sa;
	
	
	//tripDetail함수에 변수값 전달후 실행
	tripDetail(travelNo);
	//tripDetailReply 함수 실행 
	tripDetailListReply(travelNo);
	
	
	//tripDetail 페이지 시작 
	function tripDetail(travelNo){
		console.log('tripDetail 시작');			
		console.log('넘어온 tboardNo는:'+travelNo);		
		
		tripDetailFactory.tripDetail(sa,travelNo)
		.success(function(data){
			if(data.USER_NO == data.wuser_no){
				$scope.readUserButton=false;
				$scope.writeUserButton=true;
			}else if(data.TRAVEL_USER_COUNT <= data.JOINCOUNT){
				$scope.readUserButton=false;
				$scope.writeUserButton=false;
			}else{
				$scope.readUserButton=true;
				$scope.writeUserButton=false;
			}
			
			console.log('디비에서 꺼내온 main detail 출력용 data:'+JSON.stringify(data));
    		
			$scope.trip=data;
			
			console.log("HTML예 출력할 데이타 :" +JSON.stringify($scope.trip));
    		
    	}).error(function (error){
    		console.log('실패');
    		
    	});
	}//tripDetail 끝
	
	
	//수정하기 누르면 메인 리스트 출력한거 감추고 편집 화면 나오기
	$scope.mainTripDetail=true;
	//리스트 페이지 보이게	
	$scope.editPage=false 
	//에디트 페이지  안보이게
	
	
	
	//메인 상세보기 수정 시작	
	$scope.goEditTripDetail=function(){
		$scope.mainTripDetail=false;
		$scope.editPage=true;
		$scope.writeUserButton=false;	
	}
	
	$scope.goEditTripRequest=function(){
		editTripRequest(travelNo)
	};
	
	function editTripRequest(travelNo){
		
		$scope.submitted = true;    	
    	if( $scope.editTripForm.tripTitleInput.$valid && 
    		$scope.editTripForm.tripDestinationInput.$valid	&& 
    		$scope.editTripForm.datepicker3.$valid && 
    		$scope.editTripForm.datepicker4.$valid ){
        	console.log("여행세부게시판수정 시작...");
        	
        	var trip =$scope.editTrip;
    		
    		var tripfile=$scope.tripfile;		
        	console.log ('수정할 여행세부게시판 내용: '+JSON.stringify(trip));
        	
    		if (typeof $scope.tripfile == 'undifined') {
	    		console.log('업로드 파일은 :' + JSON.stringify(tripfile.name));
	        	
	    			//파일객체에서 이름을 빼서 tripFile에 저장후 substr함수로 따음표 잘라내기
	    			var tripFile= JSON.stringify(tripfile.name)
	    						  .substr(1,JSON.stringify(tripfile.name).length-2);
	    			console.log('여행파일은? :'+tripFile)
	    			
	    			//여행등록 객체에 파일이름 추가 
	    			trip.travelPho=tripFile;	
	    			
	    			console.log("사진 파일 추가후 업로드"+JSON.stringify(trip));
	    				
	    				//파일객체 서비스에 전송
	    		
	    			tripService.addTripFile(sa,tripfile);
	    			
	    		}else{
	    			trip.travelPho='1.png';
	    			console.log("디폴트파일이름"+JSON.stringify(trip.travelPho));
	    			 
	    		}
	    		
			console.log('여행상세게시판 수정 내용  :'+JSON.stringify(trip));
			//여행수정 객체 서비스에 전송
			tripDetailFactory.editTripDetail(sa,trip,travelNo)
			.success(function(){
				tripDetail(travelNo)
	    		$scope.mainTripDetail=true;
	    		$scope.editPage=false;
	    		$scope.writeUserButton=true;
			}).error(function(error){
				console.log('tripDetailReply 콘트롤러 실패');
			})
    		
    		//완료후 메인페이지 리스트 뿌려주기
    			
    		}else{
    			console.log('양식을 입력하세요');
    		}		
	}
			
	//메인 상세보기 삭제 시작
 
	$scope.goDeleteTripDetail=function(){	   
		
		/*상세보기 삭제 modal 설정*/
		 var modalDefaults = {
				 	backdrop: true,
		            keyboard: true,
		            modalFade: true,
	                templateUrl: '/partials/tripDetailDeleteModal.html',
	            };
		 
		 var modalOptions = {
		            closeButtonText: '취소',
		            actionButtonText: '삭제',
		            headerText: '게시물 삭제',
		            bodyText: '게시물을 정말  삭제하시겠습니까?'
		        };
		 
		 /*modal 페이지*/
		  modalService.showModal(modalDefaults, modalOptions).then(function () {
			  deleteTripDetail(travelNo);  
	        });
	}

	function deleteTripDetail(travelNo){
		console.log(travelNo)
		
		tripDetailFactory.deleteTripDetail(sa,travelNo)
		.success(function(data){
			console.log('콘트롤러 메인 게시판 상세보기 삭제 성공')
			$scope.location.path('/main');
		}).error(function(error){
			console.log('콘트롤러 메인 게시판 상세보기 삭제 실패')
		})
		
	}
	
	
	//여행참가하기 버튼 클릭 방장한테 푸쉬 날리기
	$scope.goEnterTrip=function(){
		pushEnterTrip()
	};
	
	function pushEnterTrip(){
		console.log('여행참가하기 버튼 클릭')
		tripDetailFactory.pushEnterTrip(sa,travelNo)
		.success(function(){
			console.log('여행참가하기 푸시 성공');
		}).error(function(error){
			console.log('여행참가하기 푸시 실패');
		})
		
	}
	
	
	
	//리플 리스트 시작
	function tripDetailListReply(travelNo){
		console.log('tripDetailReply 시작')
		tripDetailFactory.tripDetailListReply(sa,travelNo)
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
		tripDetailFactory.tripDetailReply(sa,tripDetailData,travelNo)
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
		tripDetailFactory.delTripDetailRe(sa,tripDetailReNo)
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
			tripDetailFactory.tripDetailReplyEdit(sa,tripDetailReNo,tripDetailReEditDescription)
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