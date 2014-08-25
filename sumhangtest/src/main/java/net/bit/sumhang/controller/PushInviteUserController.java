package net.bit.sumhang.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpSession;

import net.bit.sumhang.domain.TripVO;
import net.bit.sumhang.domain.UserStatusVO;
import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.google.android.gcm.server.Message;
import com.google.android.gcm.server.Result;
import com.google.android.gcm.server.Sender;
import com.google.gson.Gson;

@Controller
public class PushInviteUserController {
	
	@Autowired
	private SqlSession sqlSession;
	
	@RequestMapping(value="/pushInviteUser", method = RequestMethod.POST)
	public @ResponseBody String pushInvteUser(HttpSession session, @RequestBody String userNo){
		
		//session에서 UserVO가져오기
		
		UserVO userVO;
		String SumJangNick=null;
		
		if(session.getAttribute("user")!=null){				
			userVO=(UserVO)session.getAttribute("user");
			System.out.println("userVO임:"+userVO);		
			 SumJangNick=userVO.getNick();
		}			
		
		UserVO inviteUserVO = new UserVO();		
		Gson gson = new Gson();		
		inviteUserVO=gson.fromJson(userNo, UserVO.class);
		System.out.println("초대할 유저 객체"+inviteUserVO);

		
		//디비에서 푸쉬로 초대할 유저 닉네임 레지스트리 아이디 가져오기
		Map <String, String> map = new HashMap<String,String>();
		map = sqlSession.selectOne("userControlMapper.invitePushUser", inviteUserVO.getUserNo());
		System.out.println("초대할 유저 레지아디, 닉네임"+map);
		//디비에서 꺼낸 포시보낼 유저 닉네임
		String pushUserNick=map.get("NICK");
		String pushUserRegId=map.get("REGISTID");
		String pushInvteMessage=SumJangNick+"님이  "+pushUserNick+
								"님을 초대하셨습니다. 여행을 떠나요~~~~~♡";
		InvitePushUser( pushUserRegId, pushInvteMessage);
		
		
		return "";
	}
	
		private void InvitePushUser(String registId, String pushMessage){
			Sender sender = new Sender("AIzaSyBzr8ZxqRDmP_P7WuN5ffp3U-4cUcEoDHU");
			
			Message message = new Message.Builder()
										.addData("message",pushMessage)
										.timeToLive(10)
										.build();
			
			Result result;
			System.out.println(message);
			try {
				result = sender.send(message, registId, 5);
				String messageId = result.getMessageId();
				System.out.println(messageId);
			} catch (IOException e) { // TODO Auto-generated catch block
				e.printStackTrace();
			}		
		}
	
}
