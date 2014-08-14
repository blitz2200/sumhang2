app.factory('tripDetailFactory',['$http', function($http){
	
	var tripDetailFactory = {};

	tripDetailFactory.tripDetail = function(sa,travelNo){
		//메인 리스트 ajax로 요청
		console.log('팩토리에 넘어온 travelNo:'+travelNo);
		return $http({
			'url' :sa+"tripDetail.ajax",
			'method' : 'POST',
			'data' : {'travelNo':travelNo}
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('여행 세부 게시판 가져오기 성공'+JSON.stringify(data));			
		}).error(function(){
			console.log('여행 세부 게시판 받아오기 실패');
		})
	};
	
	//메인 상세보기 삭제 시작
	tripDetailFactory.deleteTripDetail=function(sa,travelNo){
		console.log('팩토리 메인 상세보기 삭제 시작')
		alert('팩토리 메인 상세보기 삭제  넘어온 travelNo확인 : ' + travelNo);
		return $http({
			'url' :sa+"deleteTripDetail.ajax",
			'method': 'POST',
			'data' : {'travelNo':travelNo}
		}).success(function(){
			console.log('팩토리 메인상세보기 게시판 삭제 성공')
		}).error(function(){
			console.log('팩토리 메인상세보기 게시판 삭제 실패')
		})
	}
	
	//메인 상세보기 수정 시작
	tripDetailFactory.editTripDetail=function(sa,trip,travelNo){
		trip.travelNo=travelNo;
		alert('팩토리 메인 상세보기 수정 시작')
		alert('팩토리 메인 상세보기 수정  넘어온 trip 객체 ====='+JSON.stringify(trip));
				
		return $http({
			'url':sa+"editTripDetail.ajax",
			'method' : 'POST',
			'data'   :	trip
		}).success(function(){
			alert('팩토리 메인상세보기 게시판 수정 성공')
		}).error(function(){
			alert('팩토리 메인상세보기 게시판 수정 실패')
		})
	}
	
	//여행 참가하기 버튼 클릭 방장한테 푸시 날리기	
	tripDetailFactory.pushEnterTrip=function(sa,travelNo){
		alert('팩토리 여행참가하기 버튼 클릭 방번호'+travelNo);
		return $http({
			'url' : sa+"pushEnterTrip.ajax",
			'method' : 'POST',
			'data': {'userNo':userNo}
		}).success(function(data){
			alert('여행 참가하기 버튼 클릭 방장한테 푸시 날리기 성공')
		}).error(function(){
			alert('여행 참가하기 버튼 클릭 방장한테 푸시 날리기 실패 ')
		})
	}


	
	
	var suser;
	
	//리플 출력 시작
	tripDetailFactory.tripDetailListReply=function(sa,travelNo){
		console.log('tripDetailFactory 시작 넘어온 travelNo확인 : ' + travelNo);
		return $http({
			'url' :sa+"tripDetailListReply.ajax",
			'method': 'POST',
			'data' : {'travelNo':travelNo}
		}).success(function(data){
			console.log('여행 세부 게시판 리플 가져오기 성공'+JSON.stringify(data));
		
			console.log('data[length-1].suser_no:   '+data[data.length-1].suser_no);
			
			/*세션에든 유저 넘버*/
			 suser=data[data.length-1].suser_no;
			 console.log('세션에든 유저 넘버'+suser);
			 
			/*세션 유저 넘버 자르기*/ 
			data.splice(data.length-1);
			console.log('마지막 userno 짜른후 data:'+ JSON.stringify(data));
			
			/*세션 유저 넘버와 리플 게시판 유저넘버 비교후 true false 붙여 넣기*/
			for(var i=0; i<data.length;i++){
				if(data[i].user_no==suser){
					console.log('트루 user_no[  ' +i+']  :'+data[i].user_no);
					data[i].del='true';//제이슨 추가
				}
				else{
					console.log('실패 user_no[  ' +i+']  :'+data[i].user_no);
					data[i].del='false';
				}
			}
			
			console.log('최종 연산후 data: '+JSON.stringify(data));
			
			
			
		}).error(function(){
			console.log('여행 세부 게시판 리플 가져오기 실패');
		})
	};

	
	//리플 입력 시작
	
	tripDetailFactory.tripDetailReply=function(sa,tripDetailReply,travelNo){
		console.log('팩토리에 넘어온 메인상세 리플: '+tripDetailReply);
		console.log('팩토리에 넘어온 메인상세 방번호: '+travelNo);
		return $http({
			'url' :sa+"tripDetailReply.ajax",
			'method' : 'POST',
			'data' : {'travelNo':travelNo,
					  'tripDetailReply':tripDetailReply 	
					 }
		
		}).success(function(data){
			console.log('여행 상세 게시판 리플 입력 성공??   '+data);
		}).error(function(){
			console.log('여행 상세 게시판 리플 입력 실패');
		})
	};
	
	
	//리플 삭제 시작 
	tripDetailFactory.delTripDetailRe=function(sa,tripDetailReNo){
		console.log('팩토리 리플 델리트 시작');
		console.log('팩토리에 넘어온 메인상세 리플 번호: '+tripDetailReNo);
		return $http({
			'url' :sa+"delTripDetailRe.ajax",
			'method' : 'POST',
			'data' : {'tripDetailReNo':tripDetailReNo}
		}).success(function(data){
			console.log('팩토리 리플 삭제 성공');
		}).error(function(){
			console.log('팩토리 리플 삭제 실패');
		})
	};
	
	//리플 수정 시작
	tripDetailFactory.tripDetailReplyEdit=function(sa,tripDetailReNo,tripDetailReply){
		console.log('랙토리 리플 수정 시작');
		console.log('팩토리에 넘어온 수정 리플 번호 : '+tripDetailReNo);
		console.log('팩토리에 넘어온 수정 내용 : '+tripDetailReply)
			return $http({
			'url' :sa+"editTripDetailRe.ajax",
			'method' : 'POST',
			'data' : {'tripDetailReNo':tripDetailReNo,
					  'tripDetailReply':tripDetailReply
					 }
		}).success(function(data){
			console.log('팩토리 리플 수정성공');
		}).error(function(){
			console.log('팩토리 리플 수정 실패');
		})
	};
	
	
	//컨트롤러에 작업 완료후 객체 넘겨주기 
	return tripDetailFactory;
		
}])