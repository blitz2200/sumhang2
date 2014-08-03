package net.bit.sumhang.controller;

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

@Controller
public class TimeLineController {

		@Autowired
		private SqlSession sqlSession;
		private UserVO userVO;
		
		@RequestMapping(value="/timeLine", method = RequestMethod.GET)
		public @ResponseBody TripVO getTimeLine(HttpSession session, @RequestBody String timeLine){
			
			
			System.out.println("타임라인 시작... ");
			
			if(session.getAttribute("user")!=null){
				System.out.println("찍히나?");
				userVO=(UserVO)session.getAttribute("user");
				System.out.println(userVO);
			}			
			
			
			
			System.out.println(sqlSession.selectOne("tripControlMapper.selectTripTimeLine",userVO.getId()));
			return sqlSession.selectOne("tripControlMapper.selectTripTimeLine",userVO.getId());
		}
}
