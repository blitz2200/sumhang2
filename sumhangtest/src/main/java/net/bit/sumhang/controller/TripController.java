package net.bit.sumhang.controller;



import java.util.List;

import net.bit.sumhang.domain.TripVO;
import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;



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
	
	@RequestMapping(value="/main", method=RequestMethod.GET)
	public @ResponseBody List<TripVO> selectTrip(){
			System.out.println("메인 리스트 시작...");
			
			System.out.println(sqlSession.selectList("tripControlMapper.selectTrip"));
			return sqlSession.selectList("tripControlMapper.selectTrip");
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

	
}
