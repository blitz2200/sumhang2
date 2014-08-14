package net.bit.sumhang.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

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
}
