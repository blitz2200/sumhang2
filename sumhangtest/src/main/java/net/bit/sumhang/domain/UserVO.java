package net.bit.sumhang.domain;

public class UserVO {
	private String id;
	private String name;
	private String password;
	private String nick;
	private String birth;
	private String gender;
	private String photo;
	private String push;
	private String invite;
	private String signOut;
	private String role;
	private int userNo;
	private String regId;
	private String sPhoto;
	
	
	

	public String getsPhoto() {
		return sPhoto;
	}
	public void setsPhoto(String sPhoto) {
		this.sPhoto = sPhoto;
	}
	public String getRegId() {
		return regId;
	}
	public void setRegId(String regId) {
		this.regId = regId;
	}
	public int getUserNo() {
		return userNo;
	}
	public void setUserNo(int userNo) {
		this.userNo = userNo;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getNick() {
		return nick;
	}
	public void setNick(String nick) {
		this.nick = nick;
	}
	public String getBirth() {
		return birth;
	}
	public void setBirth(String birth) {
		this.birth = birth;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender = gender;
	}
	public String getPhoto() {
		return photo;
	}
	public void setPhoto(String photo) {
		this.photo = photo;
	}
	public String getPush() {
		return push;
	}
	public void setPush(String push) {
		this.push = push;
	}
	public String getInvite() {
		return invite;
	}
	public void setInvite(String invite) {
		this.invite = invite;
	}

	public String getSignOut() {
		return signOut;
	}

	public void setSignOut(String signOut) {
		this.signOut = signOut;
	}
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	@Override
	public String toString() {
		return "UserVO [id=" + id + ", name=" + name + ", password=" + password
				+ ", nick=" + nick + ", birth=" + birth + ", gender=" + gender
				+ ", photo=" + photo + ", push=" + push + ", invite=" + invite
				+ ", signOut=" + signOut + ", role=" + role + ", userNo="
				+ userNo + ", regId=" + regId + ", sPhoto=" + sPhoto + "]";
	}
	


	
}
