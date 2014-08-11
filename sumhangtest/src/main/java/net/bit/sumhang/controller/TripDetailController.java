package net.bit.sumhang.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import net.bit.sumhang.domain.TripVO;
import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.gson.Gson;

@Controller
public class TripDetailController {
		
		@Autowired
		private SqlSession sqlSession;
		private UserVO userVO;
		
	//메인 게시판 상세보기 시작
		@RequestMapping(value="/tripDetail", method=RequestMethod.POST)
		public @ResponseBody Map<String,String> tripDetail( @RequestBody  String travelNo){
			
			TripVO tripVO;
			System.out.println("tripDetail 시작");
			System.out.println("넘어온  tripDetail travelNo:  "+ travelNo);
			Gson gson = new Gson();
			tripVO=gson.fromJson(travelNo, TripVO.class);
			System.out.println(tripVO);
			Map <String,String> map = new HashMap<String,String>();
			
			System.out.println("메인게시판 세부내용"+sqlSession.selectOne("tripControlMapper.tripDetail",tripVO));
			map=sqlSession.selectOne("tripControlMapper.tripDetail",tripVO);
			System.out.println(map);
			return map;
		}
		
		 
	//메인  상세보기 리플 출력 시작 
	
		@SuppressWarnings("rawtypes")
		@RequestMapping(value="/tripDetailListReply", method=RequestMethod.POST)
		public @ResponseBody List<Map> tripDetailListReply(HttpSession session, @RequestBody String travelNo){
			System.out.println("tripDetailListReply 시작 넘어온 travelNo 확인  :   " +travelNo);
			
			TripVO tripVO;
		    List <Map> list = new ArrayList<Map>();
			//Map <String,String> map = new HashMap<String,String>();
		    
		    
		    if(session.getAttribute("user")!=null){
				userVO=(UserVO)session.getAttribute("user");
				System.out.println("userVO 세션확인:"+userVO);
				System.out.println("userVO userNo:"+userVO.getUserNo());
			}	
		    
		    
			Gson gson = new Gson();			
			tripVO=gson.fromJson(travelNo, TripVO.class);
			
			
			System.out.println("fromJson 후  메인상세보기게시판 리플 객체" + tripVO.getTravelNo());
			System.out.println("메인상세보기 리스트 db에서 꺼내온값:" +
					sqlSession.selectList("tripControlMapper.selectTripDetailReply",tripVO.getTravelNo()));
						
			list=sqlSession.selectList("tripControlMapper.selectTripDetailReply",tripVO.getTravelNo());
			
			Map <String,String> map = new HashMap<String,String>();
			map.put("suser_no",Integer.toString(userVO.getUserNo()));
			list.add(map);
			System.out.println("여행상세보기 게시판리턴할 최종리스트 :  "+list);
			
			return list;
		}
		
		
		//메인 상세 게시판 리플 달기 시작
		@RequestMapping(value="/tripDetailReply", method=RequestMethod.POST)
		public @ResponseBody String tripDetailReply(HttpSession session, @RequestBody String tripDetailReply){
			System.out.println("tripDetailReply 시작");
			System.out.println("넘어온 tripDetailReply:  "  + tripDetailReply);
			TripVO tripVO;
			
			if(session.getAttribute("user")!=null){
				userVO=(UserVO)session.getAttribute("user");
				System.out.println("userVO 세션확인:"+userVO);
				System.out.println("userVO userNo:"+userVO.getUserNo());
			}	
			
			Gson gson = new Gson();
			tripVO=gson.fromJson(tripDetailReply, TripVO.class);
			tripVO.setUserNo(userVO.getUserNo());
			System.out.println("모든값 세팅완료후 tripvo출력"+tripVO);
			sqlSession.insert("tripControlMapper.tripReply",tripVO);
			return "입력 완료";
					
		}
		
		//메인 상세 게시판 리플 삭제 시작
		@RequestMapping(value="/delTripDetailRe", method=RequestMethod.POST)
		public @ResponseBody String delTripDetailRe(@RequestBody String tripDetailReNo){
			System.out.println("delTripDetailRe시작");
			System.out.println("넘어온 tripDetailReNo  :  "  + tripDetailReNo);
			TripVO tripVO;
			
			Gson gson = new Gson();
			tripVO=gson.fromJson(tripDetailReNo, TripVO.class);
			
			sqlSession.delete("tripControlMapper.deleteTripDetailReply", tripVO.getTripDetailReNo());
			
			return "삭제 완료";			
		}
		
		//메인 상세 게시판 리플 수정 시작
		@RequestMapping(value="/editTripDetailRe", method=RequestMethod.POST)
		public@ResponseBody String editTripDetailRe(@RequestBody String editTripDetailReply){
			System.out.println("editTripDetailRe 시작 ");
			System.out.println("넘어온 메인상세페이지 수정넘버 수정내용"+editTripDetailReply);
			TripVO tripVO;
			
			Gson gson = new Gson();
			tripVO=gson.fromJson(editTripDetailReply ,TripVO.class);
			System.out.println("db에넣을 수정리플 tripVO:"+tripVO);
			sqlSession.update("tripControlMapper.updateTripDetailReply", tripVO);
			System.out.println(sqlSession.update("tripControlMapper.updateTripDetailReply", tripVO));	
			return "수정 완료";
		}
		
}
