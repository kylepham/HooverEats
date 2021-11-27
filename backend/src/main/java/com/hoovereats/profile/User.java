package com.hoovereats.profile;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import java.util.Collections;
import java.util.List;

@Entity // This tells Hibernate to make a table out of this class
public class User {
	@Id
	private String uid;

	private String name;

	private String username;

	private String email;

	@Column(name = "photo_url")
	private String photoUrl;

	@Enumerated(EnumType.STRING)
	private Swipe type;

	@Column(name = "grad_year")
	private Integer gradYear;

	@Convert(converter = ListStringConverter.class)
	private List<String> major;

	@Convert(converter = ListStringConverter.class)
	private List<String> tags;

	@Convert(converter = ListPreferencesConverter.class)
	private List<Preference> preferences;

	public User() {
	}

	public User(String uid, String name, String username, String email, String photoUrl, Swipe type, Integer gradYear,
				List<String> major, List<String> tags, List<Preference> preferences) {
		this.uid = uid;
		this.name = name;
		this.username = username;
		this.email = email;
		this.photoUrl = photoUrl;
		this.type = type;
		this.gradYear = gradYear;
		this.major = (major == null)? Collections.singletonList("Undecided") :major;
		this.tags = tags;
		this.preferences = preferences;
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

	public String getPhotoUrl() {
		return photoUrl;
	}

	public void setPhotoUrl(String photoUrl) {
		this.photoUrl = photoUrl;
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

	public List<String> getMajor() {
		return major;
	}

	public void setMajor(List<String> major) {
		this.major = major;
	}

	public List<String> getTags() {
		return tags;
	}

	public void setTags(List<String> tags) {
		this.tags = tags;
	}

	public List<Preference> getPreferences() {
		return preferences;
	}

	public void setPreferences(List<Preference> preferences) {
		this.preferences = preferences;
	}

	@Override
	public String toString() {
		return "User{" +
				"uid='" + uid + '\'' +
				", name='" + name + '\'' +
				", username='" + username + '\'' +
				", email='" + email + '\'' +
				", photoUrl='" + photoUrl + '\'' +
				", type=" + type +
				", gradYear=" + gradYear +
				", major=" + major +
				", tags=" + tags +
				", preferences=" + preferences +
				'}';
	}
}
