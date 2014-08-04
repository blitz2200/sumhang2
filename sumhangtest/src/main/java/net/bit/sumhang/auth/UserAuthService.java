package net.bit.sumhang.auth;

import java.util.Map;

import net.bit.sumhang.domain.UserVO;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserAuthService{
	
	@Autowired
	private SqlSession sqlSession;
	private UserVO userVO;

	
	public UserVO authentication(Map<String,String> loginInfo){
		System.out.println("authentication invoked");
		System.out.println(loginInfo);
		System.out.println(sqlSession);
		
		
		userVO = sqlSession.selectOne("userControlMapper.getUser",(String)loginInfo.get("username"));
		
		if(loginInfo.get("password").equals(userVO.getPassword())){
			
			return userVO;	

		}else{
			return null;
		}
		
	}//end of authentication()
	
	

}//end of userAuth
