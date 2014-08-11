package net.bit.sumhang.domain;

public class TimeLineVO {
	private int timeLineNo;
	private int tboardNo;
	private int userNo;
	private String timeLinePhoto;
	private String timeLineDesc;
	private int timeLineLike;
	
	
	
	
	public int getTimeLineNo() {
		return timeLineNo;
	}




	public void setTimeLineNo(int timeLineNo) {
		this.timeLineNo = timeLineNo;
	}




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




	public String getTimeLinePhoto() {
		return timeLinePhoto;
	}




	public void setTimeLinePhoto(String timeLinePhoto) {
		this.timeLinePhoto = timeLinePhoto;
	}




	public String getTimeLineDesc() {
		return timeLineDesc;
	}




	public void setTimeLineDesc(String timeLineDesc) {
		this.timeLineDesc = timeLineDesc;
	}




	public int getTimeLineLike() {
		return timeLineLike;
	}




	public void setTimeLineLike(int timeLineLike) {
		this.timeLineLike = timeLineLike;
	}




	@Override
	public String toString() {
		return "TimeLineVO [timeLineNo=" + timeLineNo + ", tboardNo=" + tboardNo
				+ ", userNo=" + userNo + ", timeLinePhoto="
				+ timeLinePhoto + ", timeLineDesc=" + timeLineDesc + ", timeLineLike="
				+ timeLineLike + "]";
	}

	
	


}
