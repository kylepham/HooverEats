package com.hoovereats.profile;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	private String uid;

	private String name;

	private String username;

	private String email;

	private String occupation;

	private Swipe type;

	@Column(name = "grad_year")
	private Integer gradYear;

	private String major;

	public User() {
	}

	public User(String uid, String name, String username, String email, String occupation, Swipe type, Integer gradYear, String major) {
		this.uid = uid;
		this.name = name;
		this.username = username;
		this.email = email;
		this.occupation = occupation;
		this.type = type;
		this.gradYear = gradYear;
		this.major = major;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public Swipe getType() {
		return type;
	}

	public void setType(Swipe type) {
		this.type = type;
	}

	public Integer getGradYear() {
		return gradYear;
	}

	public void setGradYear(Integer gradYear) {
		this.gradYear = gradYear;
	}

	public String getMajor() {
		return major;
	}

	public void setMajor(String major) {
		this.major = major;
	}

	@Override
	public String toString() {
		return "User{" +
				"uid='" + uid + '\'' +
				", name='" + name + '\'' +
				", username='" + username + '\'' +
				", email='" + email + '\'' +
				", type='" + type + '\'' +
				", gradYear=" + gradYear +
				", major='" + major + '\'' +
				'}';
	}

}
