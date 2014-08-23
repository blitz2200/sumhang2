package net.bit.sumhang.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpSession;
import javax.xml.ws.RequestWrapper;

import net.bit.sumhang.auth.UserAuth;
import net.bit.sumhang.auth.UserAuthService;
import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

@Controller
public class UserController {

	@Autowired
	private SqlSession sqlSession;
	private UserVO userVO;	
	@Autowired
	private UserAuthService userAuthService;

	// 세션체크
	@RequestMapping(value = "/loginCheck", method = RequestMethod.POST)
	public @ResponseBody UserAuth loginCheck(HttpSession session, @RequestBody String loginInfo) {
		
		
		
		if(session.getAttribute("user") == null){
			return null;
		}else{
			UserAuth userAuth= new UserAuth();
			userAuth.setIsLogged(true);
			System.out.println("uservo"+userVO);
			return userAuth;
		}		
	}

	// 로그인
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody UserVO loginRequest(HttpSession session, @RequestBody String loginInfo) {
		
		
		Map<String, String> map = new HashMap<String, String>();
		
		//JSON형식 GSON사용하여 스트링으로 바꾸기 
		Gson gson = new Gson();
		map = gson.fromJson(loginInfo, Map.class);		
		
		
		userVO = userAuthService.authentication(map);
		
		if(userVO != null) {
			
			session.setAttribute("user", userVO);
			System.out.println("session에있는 user"+session.getAttribute("user"));
			
			return userVO;
		}else {
			return null;
		}
		

	}

	//회원가입
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public @ResponseBody String addUser(@RequestBody String user){
		
			System.out.println("넘어온 유저 데이타는?"+user);
			//유저객체 생성
			UserVO addUser;
			
			//JSON형식 GSON사용하여 스트링으로 바꾸기 
			Gson gson = new Gson();
			addUser=gson.fromJson(user, UserVO.class);
			
										
				//DB에 자료 넣기
				System.out.println("디비에 넣을 유저 데이타는?"+addUser);			
				sqlSession.insert("userControlMapper.addMember", addUser);
				return user;
			
	}
	
	//아이디 중복체크
	@RequestMapping(value = "/idDuplicateCheck", method = RequestMethod.POST)
	public @ResponseBody String idDuplicateCheck(@RequestBody String userId){
		
			System.out.println("넘어온 유저아이디 데이타는?"+userId);			
			
			//DB자료와 유효성체크
			if(sqlSession.selectOne("userControlMapper.getUserbyId",userId)==null){
				System.out.println("중복아님");
				return "notDuplicated";
			}else{
				System.out.println("중복임");
				return null;
			}
	}
	
	//닉네임 중복체크
	@RequestMapping(value = "/nickDuplicateCheck", method = RequestMethod.POST)
	public @ResponseBody String nickDuplicateCheck(@RequestBody String nick){
		
			System.out.println("넘어온 유저 닉네임데이타는?"+nick);			
			
			//DB자료와 유효성체크
			if(sqlSession.selectOne("userControlMapper.getUserbyNick",nick)==null){
				System.out.println("중복아님");
				return "notDuplicated";
			}else{
				System.out.println("중복임");
				return null;
			}
	}
	
	//유저정보 업데이트
		@RequestMapping(value = "/updateUserInfo", method = RequestMethod.POST)
		public @ResponseBody String updateUserInfo(@RequestBody String userInfo){
			
				
				System.out.println("넘어온 유저 데이타는?"+userInfo);
				//유저객체 생성
				UserVO userVO;
				
				//JSON형식 GSON사용하여 스트링으로 바꾸기 
				Gson gson = new Gson();
				userVO = gson.fromJson(userInfo, UserVO.class);
				
											
				//DB에 자료 넣기
				System.out.println("디비에 넣을 유저 데이타는?"+userVO);			
				sqlSession.update("userControlMapper.updateUserInfo", userVO);
				return "success";
		}
	
	/*로그아웃*/
	@RequestMapping(value = "/logout", method = RequestMethod.POST)
	public @ResponseBody String logout(HttpSession session){
		session.removeAttribute("user");
		
		return "logoutSuccess";
	}
	
	/*getSessionUser*/
	@RequestMapping(value = "/getSessionUser", method = RequestMethod.POST)
	public @ResponseBody UserVO getSessionUser(HttpSession session){
		System.out.println("getSessionUser invoked...");
		
		UserVO userVO;
		userVO = (UserVO)session.getAttribute("user");
		System.out.println("sessionUser"+userVO);
		return userVO;
	}
	
	
	
		
}
