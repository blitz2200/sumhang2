package net.bit.sumhang.controller;




import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import net.bit.sumhang.domain.TimeLineVO;
import net.bit.sumhang.domain.TripVO;
import net.bit.sumhang.domain.UserStatusVO;
import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;




import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

/**
 * Handles requests for the application home page.
 */
@Controller
public class TripController {
	@Autowired
    private SqlSession sqlSession;
	private UserVO userVO;	

	//여행 등록
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/addTrip", method = RequestMethod.POST)
	public @ResponseBody String addTrip(HttpSession session, @RequestBody String trip){
			
		System.out.println("여행 등록 시작");	
		System.out.println("넘어온 여행 데이타는?"+trip);
		
			//session에서 UserVO가져오기
			if(session.getAttribute("user")!=null){				
				userVO=(UserVO)session.getAttribute("user");
				System.out.println("userVO임:"+userVO);			
			}	
			
			Map<String,String> map;			
			Gson gson = new Gson();
			UserStatusVO userStatusVO = new UserStatusVO();
			//TimeLineVO timeLineVO = new TimeLineVO();
			
			map=gson.fromJson(trip, Map.class);
			map.put("userNo",String.valueOf(userVO.getUserNo()));
			
			//tboard DB에 자료 넣기
			System.out.println("디비에 넣을 여행 데이타는?"+map);			
			sqlSession.insert("tripControlMapper.addTrip", map);
			
			//tboard DB에 자료 넣고 자동증가값리턴받아 맵에 다시 저장받아서 userStatusVO에 setting
			System.out.println("returnValue"+map);
			userStatusVO.setTboardNo(Integer.parseInt(map.get("travelNo")));
			userStatusVO.setUserNo(Integer.parseInt(map.get("userNo")));
			userStatusVO.setStatus(1);
			
			//userStatusVO DB에 insert
			sqlSession.insert("tripControlMapper.addUserStatus", userStatusVO );
			
		return trip;
	}	
	
	
	//메인 리스트 게시판 시작
	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping(value="/main", method=RequestMethod.POST)
	public @ResponseBody List<Map> getTripList(@RequestBody String pageNum){
			System.out.println("메인 리스트 시작...");
			
			int pageCount;
			pageCount=0;
			
			if(!pageNum.equals("undefined")){
				Gson gson = new Gson();
				pageCount = gson.fromJson(pageNum, Integer.class)*5;			
			}
			System.out.println("pageCount"+pageCount);
			
			//System.out.println(sqlSession.selectList("tripControlMapper.getTripList",pageCount));
			List<Map> list = new ArrayList<Map>();
			List<Map> list2 = new ArrayList<Map>();
						
			list = sqlSession.selectList("tripControlMapper.getTripList", pageCount);
			//System.out.println("getTripList"+list);
			int temp = list.size();
			for(int i=0;i<temp;i++){
				
				//System.out.println(list.get(i).get("TBOARD_NO"));
				list2 = sqlSession.selectList("tripControlMapper.getTripUsers", list.get(i).get("TBOARD_NO"));
				//System.out.println("list2"+list2);
				Map<String,Map> map = new HashMap<String,Map>();
				for(int j=0;j<list2.size();j++){
					map.put("juser"+j,list2.get(j));	
					//System.out.println("jmap"+map);					
				}
				list.get(i).putAll(map);
				System.out.println("listadded"+list);				
			}	
			
			return list;
	}
	
	//getUserTrip
	@SuppressWarnings("rawtypes")
	@RequestMapping(value="/getUserTrip", method=RequestMethod.GET)
	public @ResponseBody List<Map> getUserTrip(HttpSession session){
			System.out.println("getUserTrip invoked...");
			
			UserVO userVO = (UserVO)session.getAttribute("user");
			int sessionUserNo=userVO.getUserNo();
			System.out.println("sessionuserno"+sessionUserNo);
			
			System.out.println("getusertrip : "+ sqlSession.selectList("tripControlMapper.getUserTrip", sessionUserNo));
			
			return sqlSession.selectList("tripControlMapper.getUserTrip", sessionUserNo);
	}
	
	//getTripUsers
	@SuppressWarnings("rawtypes")
	@RequestMapping(value="/getTripUsers", method=RequestMethod.POST)
	public @ResponseBody List<Map> getTripUsers(HttpSession session, @RequestBody String travelNo){
			System.out.println("getTripUsers invoked...");
			

			System.out.println("travelNo : "+ travelNo);
			
			return sqlSession.selectList("tripControlMapper.getTripUsers", travelNo);
	}
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/kickOutTripUser", method=RequestMethod.POST)
	public @ResponseBody int kickOutTripUser(HttpSession session, @RequestBody String kickOutUser){
			System.out.println("kickOutTripUser invoked...");
			

			System.out.println("kickOutUser : "+ kickOutUser);
			
			Map<String,String> map = new HashMap<String,String>();
			Gson gson = new Gson();
			
			map=gson.fromJson(kickOutUser, Map.class);	
			
			System.out.println("map"+map);
			
			return sqlSession.delete("tripControlMapper.kickOutTripUser", map);
	}


}
