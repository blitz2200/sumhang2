package net.bit.sumhang.controller;

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
		@RequestMapping(value="/timeLine", method = RequestMethod.POST)
		public @ResponseBody Map<String,String> getTimeLine(HttpSession session, @RequestBody String travelNo){
			
			
			System.out.println("타임라인 시작... ");
			System.out.println("travelNo"+travelNo);
			
			System.out.println(sqlSession.selectOne("tripControlMapper.getTimeLine",travelNo));
			return sqlSession.selectOne("tripControlMapper.getTimeLine",travelNo);
		}
}
