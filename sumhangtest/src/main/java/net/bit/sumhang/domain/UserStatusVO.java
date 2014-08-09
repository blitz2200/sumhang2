package net.bit.sumhang.domain;

public class UserStatusVO {
	
	private int tboardNo;
	private int userNo;
	private int status;
	
	
	public int getTboardNo() {
		return tboardNo;
	}
	public void setTboardNo(int tboardNo) {
		this.tboardNo = tboardNo;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	@Override
	public String toString() {
		return "UserStatusVO [tboardNo=" + tboardNo + ", userNo=" + userNo + ", status=" + status+"]";
	}
	
	

}
