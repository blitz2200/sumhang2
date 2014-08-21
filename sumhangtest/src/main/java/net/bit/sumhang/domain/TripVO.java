package net.bit.sumhang.domain;

public class TripVO {
	private String travel;
	private String title;
	private String travelDescription;
	private String travelStart;
	private String travelEnd;
	private String travelPho;
	private int travelUserCount;
	private String travelTag;
	private int likenum;
	private int travelNo;
	private int userNo;
	private String tripDetailReply;
	private int tripDetailReNo;
	private String travelSphoto;
	
	

	public String getTravelSphoto() {
		return travelSphoto;
	}
	public void setTravelSphoto(String travelSphoto) {
		this.travelSphoto = travelSphoto;
	}
	public int getTripDetailReNo() {
		return tripDetailReNo;
	}
	public void setTripDetailReNo(int tripDetailReNo) {
		this.tripDetailReNo = tripDetailReNo;
	}
	public String getTravel() {
		return travel;
	}
	public void setTravel(String travel) {
		this.travel = travel;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTravelDescription() {
		return travelDescription;
	}
	public void setTravelDescription(String travelDescription) {
		this.travelDescription = travelDescription;
	}
	public String getTravelStart() {
		return travelStart;
	}
	public void setTravelStart(String travelStart) {
		this.travelStart = travelStart;
	}
	public String getTravelEnd() {
		return travelEnd;
	}
	public void setTravelEnd(String travelEnd) {
		this.travelEnd = travelEnd;
	}
	public String getTravelPho() {
		return travelPho;
	}
	public void setTravelPho(String travelPho) {
		this.travelPho = travelPho;
	}
	public int getTravelUserCount() {
		return travelUserCount;
	}
	public void setTravelUserCount(int travelUserCount) {
		this.travelUserCount = travelUserCount;
	}
	public String getTravelTag() {
		return travelTag;
	}
	public void setTravelTag(String travelTag) {
		this.travelTag = travelTag;
	}
	public int getLikenum() {
		return likenum;
	}
	public void setLikenum(int likenum) {
		this.likenum = likenum;
	}
	public int getTravelNo() {
		return travelNo;
	}
	public void setTravelNo(int travelNo) {
		this.travelNo = travelNo;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getTripDetailReply() {
		return tripDetailReply;
	}
	public void setTripDetailReply(String tripDetailReply) {
		this.tripDetailReply = tripDetailReply;
	}
	@Override
	public String toString() {
		return "TripVO [travel=" + travel + ", title=" + title
				+ ", travelDescription=" + travelDescription + ", travelStart="
				+ travelStart + ", travelEnd=" + travelEnd + ", travelPho="
				+ travelPho + ", travelUserCount=" + travelUserCount
				+ ", travelTag=" + travelTag + ", likenum=" + likenum
				+ ", travelNo=" + travelNo + ", userNo=" + userNo
				+ ", tripDetailReply=" + tripDetailReply + ", tripDetailReNo="
				+ tripDetailReNo + ", travelSphoto=" + travelSphoto + "]";
	}
	

	
	


}
