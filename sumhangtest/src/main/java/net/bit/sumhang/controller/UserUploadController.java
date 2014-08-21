package net.bit.sumhang.controller;

import java.awt.image.BufferedImage;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.mortennobel.imagescaling.AdvancedResizeOp;
import com.mortennobel.imagescaling.ResampleOp;

@Controller
public class UserUploadController {
	@Autowired
	private SqlSession sqlSession;
	
	@RequestMapping(value = "/userPhoto", method = RequestMethod.POST)
		public @ResponseBody String addTripFile(HttpServletRequest req,
												@RequestPart MultipartFile userPhoto){
		System.out.println("넘어온 파일 데이타는?"+userPhoto);
			
		//파일 유효성 체크	
		if(!userPhoto.isEmpty()){
				try{				
					//바이트에 넘어온 파일 저장
					byte[] bytes=userPhoto.getBytes();
					//InputStream is = tripGalleryPhoto.getInputStream();
					//업로드 파일 이름 변수에 저장
					String userPhotoFile=userPhoto.getOriginalFilename()+".jpg";
					System.out.println("업로드 파일 이름:"+ userPhotoFile);
					
					
					String rootPath = req.getSession().getServletContext().getRealPath("resources/images/userPhotoFile");
					
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
					
					System.out.println("여행게시판사진성공="+userPhotoFile);
					//리사이즈할 원본 파일 폴더경로
					
					//리사이즈 할 파일 파일확장자까지;
					String sumnailePath=req.getSession().getServletContext().getRealPath("resources/images/userPhotoFile");
					
					File sumnailFile =new File(sumnailePath+ File.separator + userPhotoFile);
					System.out.println("불러올 섬네일 파일 경로"+sumnailFile);
					
					
					BufferedImage resizeFile = ImageIO.read(sumnailFile); 
					ResampleOp resampleOp = new ResampleOp(100, 100);
					resampleOp.setUnsharpenMask(AdvancedResizeOp.UnsharpenMask.VerySharp);
					BufferedImage rescaled = resampleOp.filter(resizeFile, null);
					
					
					//리사이즈할 파일 폴더 경로
					String sumNailImage = "s_"+userPhotoFile;
					System.out.println("저장할 최후 파일 이름 : "+ sumNailImage);
					File sumnailDir = new File(sumnailePath);
					System.out.println("저장할 폴더:  "+sumnailDir);
					
					//없다면 폴더 생성					
					if(!sumnailDir.exists())
						sumnailDir.mkdir();
					
					File sumNailImageFile = new File(sumnailDir.getAbsolutePath()+File.separator+sumNailImage);
					
					ImageIO.write(rescaled, "JPG",sumNailImageFile);
					System.out.println("섬네일 유저 파일 업로드 성공");
					
				}catch (Exception e){
					System.out.println("업로드 실패 = >" + e.getMessage());
				}
			}else{
					System.out.println("파일 업로드 실패! 파일이 없습니다.");
			}
					
		return "";
	}

}

/*
@RequestMapping(value="/userPhoto", method = RequestMethod.POST)
public @ResponseBody String addUserPhoto(HttpServletRequest req,@RequestPart MultipartFile userPhoto){
	System.out.println("카메라 사진 촬영 파일"+userPhoto);

	if(!userPhoto.isEmpty()){ //파일 유효성 체크
		try{
			// 바이트에 넘어온 파일 저장
			byte[] bytes=userPhoto.getBytes(); 
			
			//업로드 파일이름 변수 에저장
			String userPhotoFile=userPhoto.getOriginalFilename()+".jpg";
			System.out.println("업로드 파일이름 : "+userPhotoFile);
			
			//저장할 파일 폴더 스트링에 저장 (서블렛 컨텍스트 홈으로 설정)
			String rootPath = req.getSession().getServletContext().getRealPath("resources/images/userPhotoFiles");    
					//.getRealPath("/");
		
			System.out.println("유저포터 저장위치: "+rootPath);
			
			//파일 저장 풀경로 만들기 
			File dir = new File(rootPath +File.separator +"resources"+File.separator
					+"images"+ File.separator + "userPhotoFiles");
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
}*/
