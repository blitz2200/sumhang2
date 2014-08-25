package net.bit.sumhang.controller.timeline;

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
public class TimeLineUploadController {
		
	@RequestMapping(value = "/timeLineUpload", method = RequestMethod.POST)
		public @ResponseBody String editTripFile(HttpServletRequest req, @RequestPart MultipartFile timeLinePhoto){
		System.out.println("넘어온 파일 데이타는?"+timeLinePhoto);
			
		//파일 유효성 체크	
		if(!timeLinePhoto.isEmpty()){
				try{				
					//바이트에 넘어온 파일 저장
					byte[] bytes=timeLinePhoto.getBytes();
				
					String timeLinePhotoFile=timeLinePhoto.getOriginalFilename()+".jpg";
					System.out.println("업로드 파일 이름:"+ timeLinePhotoFile);
					
					
					String rootPath = req.getSession().getServletContext().getRealPath("resources/images/timeLinePhotoFile");
					
					File dir = new File(rootPath);
					//디렉토리가 없다면 디렉토리 생성
					if(!dir.exists())
						dir.mkdir();
					
					System.out.println("사진 업로드 절대경로 :" +dir.getAbsolutePath());
					
					//서버에 파일 저장
					File serverFile = new File(dir.getAbsolutePath() + File.separator + timeLinePhotoFile);
					BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(serverFile));
					stream.write(bytes);
					stream.close();
					
					System.out.println("여행게시판사진성공="+timeLinePhotoFile);
					//리사이즈할 원본 파일 폴더경로
					
					//리사이즈 할 파일 파일확장자까지;
					String sumnailePath=req.getSession().getServletContext().getRealPath("resources/images/timeLinePhotoFile");
					
					File sumnailFile =new File(sumnailePath+ File.separator + timeLinePhotoFile);
					System.out.println("불러올 섬네일 파일 경로"+sumnailFile);
					
					
					BufferedImage resizeFile = ImageIO.read(sumnailFile); 
					ResampleOp resampleOp = new ResampleOp(450, 300);
					resampleOp.setUnsharpenMask(AdvancedResizeOp.UnsharpenMask.VerySharp);
					BufferedImage rescaled = resampleOp.filter(resizeFile, null);
					
					
					//리사이즈할 파일 폴더 경로
					String sumNailImage = "s_"+timeLinePhotoFile;
					System.out.println("저장할 최후 파일 이름 : "+ sumNailImage);
					File sumnailDir = new File(sumnailePath);
					System.out.println("저장할 폴더:  "+sumnailDir);
					
					//없다면 폴더 생성					
					if(!sumnailDir.exists())
						sumnailDir.mkdir();
					
					File sumNailImageFile = new File(sumnailDir.getAbsolutePath()+File.separator+sumNailImage);
					
					ImageIO.write(rescaled, "JPG",sumNailImageFile);
					System.out.println("섬네일 파일 업로드 성공");
					
				}catch (Exception e){
					System.out.println("업로드 실패 = >" + e.getMessage());
				}
			}else{
					System.out.println("파일 업로드 실패! 파일이 없습니다.");
			}
					
		return "";
	}
}
