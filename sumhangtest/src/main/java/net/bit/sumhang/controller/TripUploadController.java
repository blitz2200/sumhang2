package net.bit.sumhang.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

@Controller
public class TripUploadController {
	
	@Autowired
	private SqlSession sqlSession;
	
	@RequestMapping(value = "/tripGalleryPhoto", method = RequestMethod.POST)
		public @ResponseBody String addTripFile( @RequestPart MultipartFile tripGalleryPhoto){
		System.out.println("넘어온 파일 데이타는?"+tripGalleryPhoto);
			
		//파일 유효성 체크	
		if(!tripGalleryPhoto.isEmpty()){
				try{
					//바이트에 넘어온 파일 저장
					byte[] bytes=tripGalleryPhoto.getBytes();
					
					//업로드 파일 이름 변수에 저장
					String tripPhotoFile=tripGalleryPhoto.getOriginalFilename()+".jpg";
					System.out.println("업로드 파일 이름:"+ tripPhotoFile);
					
					//저장할 파일 폴더 스트링에 저장 (서블릿 콘텍스트 홈으로 설정)
					/*String rootPath = new HttpServletRequestWrapper(req).getRealPath("/");
					System.out.println("서블렛 콘텍스트 홈 :"+rootPath);//서블렛 콘텍스트홈*/
					String rootPath = "/tripUploads";
					//파일 저장 풀경로 만들기 
					/*File dir = new File(rootPath + File.separator +"resources"+File.separator
					+"images"+File.separator+"tripPhotoFile");*/
					File dir = new File(rootPath);
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

}
