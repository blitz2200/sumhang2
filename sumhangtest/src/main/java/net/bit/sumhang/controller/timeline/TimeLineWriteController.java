package net.bit.sumhang.controller.timeline;

import java.util.HashMap;
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
public class TimeLineWriteController {
	
	@Autowired
	private SqlSession sqlSession;
	private UserVO userVO;	
	
	@SuppressWarnings("unchecked")
	@RequestMapping(value="/timeLineAdd",  method = RequestMethod.POST)
	public @ResponseBody String writeTimeLine(HttpSession session, @RequestBody String timeLine){
		
		//session에서 UserVO가져오기
		if(session.getAttribute("user")!=null){				
			userVO=(UserVO)session.getAttribute("user");
			System.out.println("userVO임:"+userVO);			
		}
		
		Map<String,String> map=new HashMap<String, String>();
		Gson gson = new Gson();
		map = gson.fromJson(timeLine, Map.class);
		
		map.put("userNo", String.valueOf(userVO.getUserNo()));
		System.out.println("디비에 넣을 타임라인 맵 : " + map);
		
		sqlSession.insert("tripControlMapper.timeLineWrite", map);
		
		return "";
	}
	
	

}
