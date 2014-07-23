package net.bit.sumhangtest;

import javax.servlet.http.HttpServletRequest;

import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 * Handles requests for the application home page.
 */
@Controller
public class HomeController {
	@Autowired
    private SqlSession sqlSession;
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(HttpRequest request) {
		HttpServletRequest httpRequest = (HttpServletRequest)request;
		String servletPath = httpRequest.getServletPath();
		System.out.println("Requested servletPath: "+servletPath);
		System.out.println("home method invoked...");
		return "home";
	}
	
	@RequestMapping(value = "/addMember")
	public @ResponseBody UserVO addMember(@RequestBody UserVO user){
		System.out.println("addMember method invoked...");
		System.out.println(user);
		
		return user;
	}
	
	@RequestMapping(value = "/test")
	public String testUser(){
		System.out.println("testUser method invoked...");
		
		return "";
	}
	
}
