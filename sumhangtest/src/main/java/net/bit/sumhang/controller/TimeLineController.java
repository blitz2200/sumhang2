package net.bit.sumhang.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

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
public class TimeLineController {

		@Autowired
		private SqlSession sqlSession;
		
		@SuppressWarnings("rawtypes")
		@RequestMapping(value="/timeline", method = RequestMethod.POST)
		public @ResponseBody List<Map> getTimeLine(HttpSession session, @RequestBody String travelNo){
			
			
			System.out.println("타임라인 시작... ");
			System.out.println("travelNo"+travelNo);
			List <Map> list = new ArrayList<Map>();
			
			list = sqlSession.selectList("tripControlMapper.getTimelineList",travelNo);
			
			return list;
		}
		
		@SuppressWarnings("rawtypes")
		@RequestMapping(value="/timelineReply", method = RequestMethod.POST)
		public @ResponseBody String updateTimeline(HttpSession session, @RequestBody String timelineVar){
			
			
			System.out.println("타임라인 Reply 시작... ");
			System.out.println("넘어온 travelNo"+timelineVar);
					
			UserVO userVO=(UserVO)session.getAttribute("user");
			
			Gson gson = new Gson();
				
			Map<String, String> map=new HashMap<String, String>();
			map.put("userNo", Integer.toString(userVO.getUserNo()));
			
			map=gson.fromJson(timelineVar, Map.class);
	
			
			/*List <Map> list = new ArrayList<Map>();	*/
	/*		list = sqlSession.selectList("tripControlMapper.getTimelineList",travelNo);*/
			
			return "replySuccess";
		}
}
