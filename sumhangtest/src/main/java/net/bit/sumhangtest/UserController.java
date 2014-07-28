package net.bit.sumhangtest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;

/**
 * Handles requests for the application home page.
 */
@Controller
public class UserController {
	@Autowired
    private SqlSession sqlSession;
	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	
	@RequestMapping(value = "/addMember", method = RequestMethod.POST)
	public @ResponseBody String addMember(@RequestBody String user){
			System.out.println("넘어온데이타는?"+user);
			UserVO addUser;
			Gson gson = new Gson();
			addUser=gson.fromJson(user, UserVO.class);
			System.out.println("디비에 넣을 데이타는?"+addUser);
			sqlSession.insert("userControlMapper.addMember", addUser);
	
		return user;
	}
/*	
	@RequestMapping(value = "/addMember", method = RequestMethod.POST)
	public @ResponseBody String addMember(@RequestBody String user,
			@RequestParam("memberFile") MultipartFile file){
			
		UUID randomUUID = UUID.randomUUID();
			if(!file.isEmpty()){
				try{
					byte[] bytes=file.getBytes();
					String userPhotoFile=file.getOriginalFilename();
					System.out.println(userPhotoFile);//업로드 파일이름
					String rootPath = System.getProperty("catalina.home"); 
					System.out.println(rootPath);//톰캣홈
					File dir = new File(rootPath + randomUUID+File.separator + userPhotoFile);
					if(!dir.exists())
						dir.mkdir();
					
					File serverFile = new File(dir.getAbsolutePath() + File.separator + userPhotoFile);
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
					stream.write(bytes);
					stream.close();
					logger.info("Server File Location="+serverFile.getAbsolutePath());
					System.out.println("Your succesas fully file="+userPhotoFile);
				}catch (Exception e){
					System.out.println("You failed to upload = >" + e.getMessage());
				}
			}else{
					System.out.println("You failed to upload because the file was empty.");
			}
			UserVO addUser;
			Gson gson = new Gson();
			addUser=gson.fromJson(user, UserVO.class);
			
			sqlSession.insert("userControlMapper.addMember", addUser);
		
			//return user;
			
			//파일저장
			//String name=addUser.getName();
			
		return user;
	}*/
	

	/*
	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public @ResponseBody String uploadFileHandler(@RequestParam("name") String name, 
			@RequestParam("file") MultipartFile file) {
		
		if(!file.isEmpty()){
			try{
				byte[] bytes=file.getBytes();
				
				String rootPath = System.getProperty("catalina.home");
				File dir = new File(rootPath + File.separator + "tmpFiles");
				if(!dir.exists())
					dir.mkdir();
				
				File serverFile = new File(dir.getAbsolutePath() + File.separator + name);
				BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
				stream.write(bytes);
				stream.close();
				logger.info("Server File Location="+serverFile.getAbsolutePath());
				return "Your succesas fully file="+name;
			}catch (Exception e){
				return "You failed to upload" + name + " = >" + e.getMessage();
			}
		}else{
			return "You failed to upload"+name+"because the file was empty.";
		}
	}*/
	
}
