package net.bit.sumhang.controller;


import java.io.IOException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
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
public class TripDetailController {

	@Autowired
	private SqlSession sqlSession;
	private UserVO userVO;
 
	

	// 메인 게시판 상세보기 시작
	@RequestMapping(value = "/tripDetail", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> tripDetail(HttpSession session,
			@RequestBody String travelNo) {

		TripVO tripVO;
		System.out.println("==========================================");
		System.out.println("==========================================");
		System.out.println("==========================================");
		System.out.println("tripDetail 시작");
		System.out.println("넘어온  tripDetail travelNo:  " + travelNo);

		if (session.getAttribute("user") != null) {
			userVO = (UserVO) session.getAttribute("user");
			System.out.println("userVO 세션확인:" + userVO);
			System.out.println("userVO userNo:" + userVO.getUserNo());
		}

		Gson gson = new Gson();
		tripVO = gson.fromJson(travelNo, TripVO.class);
		System.out.println(tripVO);
		Map<String, String> map = new HashMap<String, String>();

		System.out.println("메인게시판 세부내용"
				+ sqlSession.selectOne("tripControlMapper.tripDetail", tripVO));

		map = sqlSession.selectOne("tripControlMapper.tripDetail", tripVO);
		map.put("wuser_no", Integer.toString(userVO.getUserNo()));
		System.out.println(map);
		return map;
	}

	// 메인 상세보기 삭제 시작
	@RequestMapping(value = "deleteTripDetail", method = RequestMethod.POST)
	public @ResponseBody String deleteTripDetail(@RequestBody String travelNo) {
		System.out.println("==========================================");
		System.out.println("메인 상세보기 삭제 시작 ");
		System.out.println("==========================================");
		System.out.println(travelNo);

		TripVO tripVO;

		Gson gson = new Gson();
		tripVO = gson.fromJson(travelNo, TripVO.class);
		sqlSession.delete("tripControlMapper.deleteTripDetail",
				tripVO.getTravelNo());

		return "삭제 성공";
	}

	// 메인 상세보기 수정 시작
	@RequestMapping(value = "editTripDetail", method = RequestMethod.POST)
	public @ResponseBody String editTripDetail(@RequestBody String trip) {
		System.out.println("==========================================");
		System.out.println("메인 상세보기 수정 시작 ");
		System.out.println("==========================================");
		System.out.println("메인 상세보기 수정할 내용" + trip);

		TripVO tripVO;

		Gson gson = new Gson();
		tripVO = gson.fromJson(trip, TripVO.class);

		System.out.println("최종 수정확인용 방번호 : " + tripVO.getTravelNo());
		sqlSession.update("tripControlMapper.updateTripDetail", tripVO);

		return "수정 성공";
	}

	// 메인 상세보기 리플 출력 시작

	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/tripDetailListReply", method = RequestMethod.POST)
	public @ResponseBody List<Map> tripDetailListReply(HttpSession session,
			@RequestBody String travelNo) {
		System.out.println("==========================================");
		System.out.println("tripDetailListReply 시작 넘어온 travelNo 확인  :   "
				+ travelNo);
		System.out.println("==========================================");

		TripVO tripVO;
		List<Map> list = new ArrayList<Map>();
		// Map <String,String> map = new HashMap<String,String>();

		if (session.getAttribute("user") != null) {
			userVO = (UserVO) session.getAttribute("user");
			System.out.println("userVO 세션확인:" + userVO);
			System.out.println("userVO userNo:" + userVO.getUserNo());
		}

		Gson gson = new Gson();
		tripVO = gson.fromJson(travelNo, TripVO.class);

		System.out
				.println("fromJson 후  메인상세보기게시판 리플 객체" + tripVO.getTravelNo());
		System.out.println("메인상세보기 리스트 db에서 꺼내온값:"
				+ sqlSession.selectList(
						"tripControlMapper.selectTripDetailReply",
						tripVO.getTravelNo()));

		list = sqlSession.selectList("tripControlMapper.selectTripDetailReply",
				tripVO.getTravelNo());

		Map<String, String> map = new HashMap<String, String>();
		map.put("suser_no", Integer.toString(userVO.getUserNo()));
		list.add(map);
		System.out.println("여행상세보기 게시판리턴할 최종리스트 :  " + list);

		return list;
	}

	// 메인 상세 게시판 리플 달기 시작
	@RequestMapping(value = "/tripDetailReply", method = RequestMethod.POST)
	public @ResponseBody String tripDetailReply(HttpSession session,
			@RequestBody String tripDetailReply) {
		System.out.println("==========================================");
		System.out.println("tripDetailReply 시작");
		System.out.println("==========================================");

		System.out.println("넘어온 tripDetailReply:  " + tripDetailReply);
		TripVO tripVO;

		if (session.getAttribute("user") != null) {
			userVO = (UserVO) session.getAttribute("user");
			System.out.println("userVO 세션확인:" + userVO);
			System.out.println("userVO userNo:" + userVO.getUserNo());
		}

		Gson gson = new Gson();
		tripVO = gson.fromJson(tripDetailReply, TripVO.class);
		tripVO.setUserNo(userVO.getUserNo());
		System.out.println("모든값 세팅완료후 tripvo출력" + tripVO);
		sqlSession.insert("tripControlMapper.tripReply", tripVO);
		return "입력 완료";

	}

	// 메인 상세 게시판 리플 삭제 시작
	@RequestMapping(value = "/delTripDetailRe", method = RequestMethod.POST)
	public @ResponseBody String delTripDetailRe(
			@RequestBody String tripDetailReNo) {
		System.out.println("==========================================");
		System.out.println("delTripDetailRe시작");
		System.out.println("==========================================");

		System.out.println("넘어온 tripDetailReNo  :  " + tripDetailReNo);
		TripVO tripVO;

		Gson gson = new Gson();
		tripVO = gson.fromJson(tripDetailReNo, TripVO.class);

		sqlSession.delete("tripControlMapper.deleteTripDetailReply",
				tripVO.getTripDetailReNo());

		return "삭제 완료";
	}

	// 메인 상세 게시판 리플 수정 시작
	@RequestMapping(value = "/editTripDetailRe", method = RequestMethod.POST)
	public @ResponseBody String editTripDetailRe(
			@RequestBody String editTripDetailReply) {
		System.out.println("==========================================");
		System.out.println("==========================================");
		System.out.println("==========================================");
		System.out.println("editTripDetailRe 시작 ");
		System.out.println("넘어온 메인상세페이지 수정넘버 수정내용" + editTripDetailReply);
		TripVO tripVO;

		Gson gson = new Gson();
		tripVO = gson.fromJson(editTripDetailReply, TripVO.class);
		System.out.println("db에넣을 수정리플 tripVO:" + tripVO);
		sqlSession.update("tripControlMapper.updateTripDetailReply", tripVO);
		System.out.println(sqlSession.update(
				"tripControlMapper.updateTripDetailReply", tripVO));
		return "수정 완료";
	}

	// GCM 여행 참가 방장한테 날리기

	@RequestMapping(value = "/pushEnterTrip", method = RequestMethod.POST)
	public @ResponseBody String pushEnterTrip(HttpSession session, @RequestBody String travelNo)
			throws IOException {
		System.out.println("==========================================");
		System.out.println("pushEnterTirp 시작 ");
		System.out.println("==========================================");
		
		System.out.println("넘어온 푸시 날릴 방 넘버" + travelNo);

		Gson gson = new Gson();

		TripVO tripVO;
		tripVO = gson.fromJson(travelNo,TripVO.class);
		
		
		
		//여행 신청한 참가자 등록하기
		if (session.getAttribute("user") != null) {
			userVO = (UserVO) session.getAttribute("user");
			System.out.println("userVO 세션확인:" + userVO);
			System.out.println("userVO userNo:" + userVO.getUserNo());
		}
		UserStatusVO usersVO= new UserStatusVO();
		
		System.out.println("방번호"+tripVO.getTravelNo());
	
		usersVO.setTboardNo(tripVO.getTravelNo());
		
		usersVO.setUserNo(userVO.getUserNo());
		usersVO.setStatus(3);
		
		System.out.println("여행 신청버튼 누른  상태테이블에 등록 할 유저 :  "+userVO);
		sqlSession.insert("tripStatusControlMapper.pussTripUserStatus",usersVO);	
		
		
		//푸시날릴 방장 레지스트리아이디 가져오기
		
		

		Map<String, String> map = new HashMap<String, String>();
		System.out.println("푸쉬 받을 방장 방번호" + tripVO.getTravelNo());
		
		
		map = sqlSession.selectOne("tripControlMapper.selectPushTripUser",
				 tripVO.getTravelNo());
		System.out.println("푸쉬아이디 날릴 방장 레지스티 아이디 " + map);

		System.out.println(map.get("REGISTID"));
		String regId = map.get("REGISTID");

		System.out.println("멥에서 꺼낸" + regId);

		Sender sender = new Sender("AIzaSyBzr8ZxqRDmP_P7WuN5ffp3U-4cUcEoDHU");
		
		String t = URLEncoder.encode("날라가라","utf-8");
		Message message = new Message.Builder()
									.addData("msg", t)
									.timeToLive(10)
									.build();
		
		Result result;
		System.out.println(message);
		try {
			result = sender.send(message, regId, 5);
			String messageId = result.getMessageId();
			System.out.println(messageId);
		} catch (IOException e) { // TODO Auto-generated catch block
			e.printStackTrace();
		}

		/*
		 * StringBuffer postDataBuilder = new StringBuffer();
		 * postDataBuilder.append("registration_id=" + regId); // 등록ID
		 * postDataBuilder.append("&collapse_key=1");
		 * postDataBuilder.append("&delay_while_idle=1");
		 * postDataBuilder.append("&data.msg=" + URLEncoder.encode("test",
		 * "UTF-8"));
		 * 
		 * 
		 * 
		 * //byte[] postData = postDataBuilder.toString().getBytes("UTF8");
		 * Map<String,String> postData =new HashMap<String, String>();
		 * postData.put("registration_id", regId); postData.put("collapse_key",
		 * "1"); postData.put("delay_while_idel", "1");
		 * postData.put("data.msg","test");
		 * 
		 * 
		 * 
		 * URL url = new URL("https://android.googleapis.com/gcm/send");
		 * HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		 * 
		 * conn.setDoOutput(true); conn.setUseCaches(false);
		 * conn.setRequestMethod("POST");
		 * conn.setRequestProperty("Content-Type",
		 * "application/x-www-form-urlencoded; charset=UTF-8");
		 * conn.setRequestProperty("Content-Length",
		 * Integer.toString(postData.length));
		 * conn.setRequestProperty("Authorization", "key=" +
		 * "AIzaSyBzr8ZxqRDmP_P7WuN5ffp3U-4cUcEoDHU");
		 * 
		 * ObjectMapper mapper = new ObjectMapper();
		 * 
		 * OutputStream out = conn.getOutputStream();
		 * mapper.writeValue(out,postData); out.flush(); out.close();
		 * conn.getInputStream();
		 * 
		 * System.out.println("postData : " + postData); String reponseLine =
		 * new BufferedReader(new InputStreamReader(
		 * conn.getInputStream())).readLine();
		 * 
		 * System.out.println("responseLine : " + reponseLine);
		 */

		/*
		 * 
		 * try{ URL url = new URL("https://android.googleapis.com/gcm/send");
		 * HttpURLConnection conn = (HttpURLConnection) url.openConnection();
		 * conn.setRequestMethod("POST");
		 * conn.setRequestProperty("Content-Type", "application/json");
		 * conn.setRequestProperty("Authorization", "key=" +
		 * "AIzaSyBzr8ZxqRDmP_P7WuN5ffp3U-4cUcEoDHU"); conn.setDoOutput(true);
		 * DataOutputStream wr = new DataOutputStream(conn.getOutputStream());
		 * 
		 * 
		 * wr.writeBytes("data"+"title=안녕하세요&");
		 * wr.writeBytes("registration_ids="+regId);
		 * 
		 * wr.flush(); wr.close();
		 * 
		 * int responseCode = conn.getResponseCode();
		 * System.out.println("\nSending 'POST' request to URL : " + url);
		 * System.out.println("Response Code : " + responseCode);
		 * 
		 * BufferedReader in = new BufferedReader(new InputStreamReader(
		 * conn.getInputStream())); String inputLine; StringBuffer response =
		 * new StringBuffer();
		 * 
		 * while ((inputLine = in.readLine()) != null) {
		 * response.append(inputLine); } in.close();
		 * 
		 * // 7. Print result System.out.println(response.toString());
		 * 
		 * } catch (MalformedURLException e) { e.printStackTrace(); } catch
		 * (IOException e) { e.printStackTrace(); }
		 */

		return "푸쉬 성공";

	}

}
