package net.bit.sumhangtest;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;

import net.bit.sumhang.domain.TripVO;
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
public class TripController {
	@Autowired
    private SqlSession sqlSession;
	
	@RequestMapping(value = "/addTrip", method = RequestMethod.POST)
	public @ResponseBody String addTrip(@RequestBody String trip){
			System.out.println("찍히냐? ");
			System.out.println(trip);
		
			TripVO addTrip;
			Gson gson = new Gson();
			addTrip=gson.fromJson(trip, TripVO.class);
			
			sqlSession.insert("tripControlMapper.addTrip", addTrip);
			
		return trip;
	}
	
	@RequestMapping(value="/main")
	public @ResponseBody String selectTrip(){
		return "a";
	}
	
	/*@RequestMapping(value = "/addTrip", method = RequestMethod.POST)
	public @ResponseBody String addTrip(@RequestBody String trip,
			@RequestParam("file") MultipartFile file){
			
		UUID randomUUID = UUID.randomUUID();
			if(!file.isEmpty()){
				try{
					byte[] bytes=file.getBytes();
					String tripPhotoFile=file.getOriginalFilename();
					System.out.println(tripPhotoFile);//업로드 파일이름
					String rootPath = System.getProperty("catalina.home"); 
					System.out.println(rootPath);//톰캣홈
					File dir = new File(rootPath + randomUUID+File.separator + tripPhotoFile);
					if(!dir.exists())
						dir.mkdir();
					
					File serverFile = new File(dir.getAbsolutePath() + File.separator + tripPhotoFile);
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
					stream.write(bytes);
					stream.close();
					logger.info("여행게시판사진 ="+serverFile.getAbsolutePath());
					System.out.println("여행게시판사진성공="+tripPhotoFile);
				}catch (Exception e){
					System.out.println("업로드실패 = >" + e.getMessage());
				}
			}else{
					System.out.println("파일이 없습니다.");
			}
			TripVO addTrip;
			Gson gson = new Gson();
			addTrip=gson.fromJson(trip, TripVO.class);
			
			sqlSession.insert("tripControlMapper.addTrip", addTrip);
		
			
		return trip;
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
