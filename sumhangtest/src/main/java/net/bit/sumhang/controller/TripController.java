package net.bit.sumhang.controller;



import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpSession;

import net.bit.sumhang.domain.TripVO;
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

/**
 * Handles requests for the application home page.
 */
@Controller
public class TripController {
	@Autowired
    private SqlSession sqlSession;
	private UserVO userVO;	

	//여행 등록
	@RequestMapping(value = "/addTrip", method = RequestMethod.POST)
	public @ResponseBody String addTrip(HttpSession session, @RequestBody String trip){
			
		System.out.println("여행 등록 시작");	
		System.out.println("넘어온 여행 데이타는?"+trip);
		
			if(session.getAttribute("user")!=null){
				System.out.println("찍히나?");
				userVO=(UserVO)session.getAttribute("user");
				System.out.println("userVO임:"+userVO);
				System.out.println("userVO임:"+userVO.getUserNo());
			}	
			
			//여행 객체 생성
			TripVO addTrip;
			
			//JSON형식 GSON사용하여 스트링으로 바꾸기 
			Gson gson = new Gson();
			addTrip=gson.fromJson(trip, TripVO.class);
			addTrip.setUserNo(userVO.getUserNo());
			
			//DB에 자료 넣기
			System.out.println("디비에 넣을 여행 데이타는?"+addTrip);			
			sqlSession.insert("tripControlMapper.addTrip", addTrip);
			
		return trip;
	}	
	
	//여행 등록 파일 저장
	@RequestMapping(value = "/addTripFile", method = RequestMethod.POST)
	public @ResponseBody String addTripFile(HttpServletRequest req, @RequestPart MultipartFile tripfile){
		
		System.out.println("넘어온 파일 데이타는?"+tripfile);
			
		//파일 유효성 체크	
		if(!tripfile.isEmpty()){
				try{
					//바이트에 넘어온 파일 저장
					byte[] bytes=tripfile.getBytes();
					
					//업로드 파일 이름 변수에 저장
					String tripPhotoFile=tripfile.getOriginalFilename();
					System.out.println("업로드 파일 이름:"+ tripPhotoFile);
					
					//저장할 파일 폴더 스트링에 저장 (서블릿 콘텍스트 홈으로 설정)
					String rootPath = new HttpServletRequestWrapper(req).getRealPath("/");
					System.out.println("서블렛 콘텍스트 홈 :"+rootPath);//서블렛 콘텍스트홈
					
					//파일 저장 풀경로 만들기 
					File dir = new File(rootPath + File.separator +"resources"+File.separator
					+"images"+File.separator+"tripPhotoFile");
					//디렉토리가 없다면 디렉토리 생성
					if(!dir.exists())
						dir.mkdir();
					
					System.out.println("사진 업로드 절대경로 :" +dir.getAbsolutePath());
					
					//서버에 파일 저장
					File serverFile = new File(dir.getAbsolutePath() + File.separator + tripPhotoFile);
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
					
					stream.write(bytes);
					stream.close();
					
					System.out.println("여행게시판사진성공="+tripPhotoFile);
				}catch (Exception e){
					System.out.println("업로드 실패 = >" + e.getMessage());
				}
			}else{
					System.out.println("파일 업로드 실패! 파일이 없습니다.");
			}
					
		return "";
	}
	
	//메인 리스트 게시판 시작
	@RequestMapping(value="/main", method=RequestMethod.GET)
	public @ResponseBody List<TripVO> selectTrip(){
			System.out.println("메인 리스트 시작...");
			
			System.out.println(sqlSession.selectList("tripControlMapper.selectTrip"));
			return sqlSession.selectList("tripControlMapper.selectTrip");
	}
	
	
	
	
	
	
}
