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
			
			//DB자료와 유효성체크
			if(sqlSession.selectOne("userControlMapper.getUser",addUser.getId())==null){
				return null;
			}else{							
				//DB에 자료 넣기
				System.out.println("디비에 넣을 유저 데이타는?"+addUser);			
				sqlSession.insert("userControlMapper.addMember", addUser);
				return user;
			}
	}
	
	//아이디 중복체크
	@RequestMapping(value = "/duplicateCheck", method = RequestMethod.POST)
	public @ResponseBody String duplicateCheck(@RequestBody String userId){
		
			System.out.println("넘어온 유저 데이타는?"+userId);			
			
			//DB자료와 유효성체크
			if(sqlSession.selectOne("userControlMapper.getUser",userId)==null){
				System.out.println("중복아님");
				return "notDuplicated";
			}else{
				System.out.println("중복임");
				return null;
			}
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
	
	
	
		@RequestMapping(value="/userPhoto", method = RequestMethod.POST)
		public @ResponseBody String addUserPhoto(@RequestPart MultipartFile userPhoto){
			System.out.println("카메라 사진 촬영 파일"+userPhoto);

			if(!userPhoto.isEmpty()){ //파일 유효성 체크
				try{
					// 바이트에 넘어온 파일 저장
					byte[] bytes=userPhoto.getBytes(); 
					
					//업로드 파일이름 변수 에저장
					String userPhotoFile=userPhoto.getOriginalFilename()+".jpg";
					System.out.println("업로드 파일이름 : "+userPhotoFile);
					
					//저장할 파일 폴더 스트링에 저장 (서블렛 컨텍스트 홈으로 설정)
					/*String rootPath = new HttpServletRequestWrapper(req).getRealPath("/");*/
					String rootPath = "c:/userUploads";
					System.out.println("유저포터 저장위치: "+rootPath);
					
					//파일 저장 풀경로 만들기 
			/*		File dir = new File(rootPath +File.separator +"resources"+File.separator
							+"images"+ File.separator + "userPhotoFiles");*/
					File dir = new File(rootPath);
					//디렉토리가 없다면 디렉토리 생성
					if(!dir.exists())
						dir.mkdir();
					
					System.out.println("사진 업로드 절대경로 :" +dir.getAbsolutePath());
					
					//서버에 파일 저장 
					File serverFile = new File(dir.getAbsolutePath() + File.separator + userPhotoFile);
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
					stream.write(bytes);
					stream.close();
					
					System.out.println("파일 업로드 성공="+userPhotoFile);
				}catch (Exception e){
					System.out.println("파일 업로드 실패  = >" + e.getMessage());
				}
			}else{
					System.out.println("파일 업로드실패 파일이 없습니다.");
			}
			return "";
		}
}
