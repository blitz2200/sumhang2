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
	
	
	
	public String getTravelTag() {
		return travelTag;
	}
	public void setTravelTag(String travelTag) {
		this.travelTag = travelTag;
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

	@Override
	public String toString() {
		return "TripVO [travel=" + travel + ", title=" + title
				+ ", travelDescription=" + travelDescription + ", travelStart="
				+ travelStart + ", travelEnd=" + travelEnd + ", travelPho="
				+ travelPho + ", travelUserCount=" + travelUserCount
				+ ", travelTag=" + travelTag + "]";
	}
	
	
}
