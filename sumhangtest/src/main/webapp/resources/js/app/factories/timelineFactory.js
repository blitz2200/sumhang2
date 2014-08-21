// 타임라인 팩토리
app.factory('timeLineFactory',['$http', function($http){
	
	var timeLineFactory = {};
	
	timeLineFactory.getTimelineList = function(sa,travelNo){
		//메인 리스트 ajax로 요청
		return $http({
			//timeLine.ajax로 서버에서  전송 스프링 컨트롤러에서 @Requestmapping timeLine찾아서 실행
			'url' :sa+"timeline.ajax",
			'method' : 'POST',
			'data' : travelNo				
		}).success(function(data){
			//db에서 자료 가져오기 성공하면 찍어보기 
			console.log('타임 라인 가져오기 성공'+JSON.stringify(data));
			
		}).error(function(){
			console.log('타임 라인 받아오기 실패');
		})
	};
	//컨트롤러에 작업 완료후 객체 넘겨주기 
	
var suser;
	
	//리플 출력 시작
	timeLineFactory.timelineListReply=function(sa,travelNo,timelineNo){
		console.log('timelineFactory 시작 넘어온 travelNo확인 : ' + travelNo);
		console.log('timelineFactory 시작 넘어온 timelineNo확인 : ' + timelineNo);
		return $http({
			'url' :sa+"timelineListReply.ajax",
			'method': 'POST',
			'data' : {'travelNo':travelNo,
						'timelinelNo':timelineNo}
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
	
	timeLineFactory.timelineReply=function(sa,timelineReply,travelNo,timelineNo){
		console.log('팩토리에 넘어온 메인상세 리플: '+timelineReply);
		console.log('팩토리에 넘어온 메인상세 방번호: '+travelNo);
		console.log('팩토리에 넘어온 타임라인 번호: '+timelineNo);
		return $http({
			'url' :sa+"timelineReply.ajax",
			'method' : 'POST',
			'data' : {'travelNo':travelNo,
						'timelineNo':timelineNo,
					  'timelineReply':timelineReply 	
					 }
		
		}).success(function(data){
			console.log('여행 상세 게시판 리플 입력 성공??   '+data);
		}).error(function(){
			console.log('여행 상세 게시판 리플 입력 실패');
		})
	};
	
	return timeLineFactory;

}])
