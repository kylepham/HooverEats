package com.hoovereats.profile;

import com.hoovereats.matching.MatchingPreferencesData;

import javax.persistence.Column;
import javax.persistence.Convert;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Collections;
import java.util.List;
import java.util.Map;

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

	//profile:

	@Transient
	@Convert(converter = ListStringConverter.class)
	private List<String> classes;

	@Convert(converter = ListStringConverter.class)
	private List<String> majors;

	@Convert(converter = ListStringConverter.class)
	private List<String> greek;

	@Convert(converter = ListStringConverter.class)
	private List<String> programs;

	@Convert(converter = ListStringConverter.class)
	private List<String> hobbies;

	private String bio;

	//preferences:
	@Column(name = "pref_classes")
	@Convert(converter = ListStringConverter.class)
	private List<String> prefClasses;

	@Column(name = "pref_majors")
	@Convert(converter = ListStringConverter.class)
	private List<String> prefMajors;

	@Column(name = "pref_greek")
	@Convert(converter = ListStringConverter.class)
	private List<String> prefGreek;

	@Column(name = "pref_programs")
	@Convert(converter = ListStringConverter.class)
	private List<String> prefPrograms;

	@Column(name = "pref_hobbies")
	@Convert(converter = ListStringConverter.class)
	private List<String> prefHobbies;

	@Convert(converter = ListPrioritiesConverter.class)
	@SuppressWarnings("JpaAttributeTypeInspection")
	private Map<String, Integer> priorities;

	public User() {
	}

	public User(String uid, String name, String username, String email, String photoUrl, Swipe type, Integer gradYear,
				List<String> majors, List<String> greek, List<String> programs, List<String> hobbies, String bio,
				List<String> prefClasses, List<String> prefMajors, List<String> prefGreek, List<String> prefPrograms,
				List<String> prefHobbies, Map<String, Integer> priorities) {
		this.uid = uid;
		this.name = name;
		this.username = username;
		this.email = email;
		this.photoUrl = photoUrl;
		this.type = type;
		this.gradYear = gradYear;
		this.majors = (majors == null)? Collections.singletonList("Undecided") : majors;
		this.greek = (greek == null)?  Collections.singletonList("No Affiliation") : greek;
		this.programs = (programs == null)? Collections.emptyList() : programs;
		this.hobbies = (hobbies == null)? Collections.emptyList() : hobbies;
		this.bio = (bio == null)? "":bio;
		this.prefClasses = (prefClasses == null)? Collections.emptyList() : prefClasses;
		this.prefMajors = (prefMajors == null)? Collections.emptyList() : prefMajors;
		this.prefGreek = (prefGreek == null)? Collections.emptyList() : prefGreek;
		this.prefPrograms = (prefPrograms == null)? Collections.emptyList() : prefPrograms;
		this.prefHobbies = (prefHobbies == null)? Collections.emptyList() : prefHobbies;
		this.priorities = (priorities == null)? ListPrioritiesConverter.DEFAULT_PRIORITIES_MAP : priorities;
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

	public List<String> getClasses() {
		return Collections.singletonList(MatchingPreferencesData.YEAR_TO_STRING_LOOKUP.get(gradYear));
	}

	public List<String> getMajors() {
		return majors;
	}

	public void setMajors(List<String> majors) {
		this.majors = majors;
	}

	public List<String> getGreek() {
		return greek;
	}

	public void setGreek(List<String> greek) {
		this.greek = greek;
	}

	public List<String> getPrograms() {
		return programs;
	}

	public void setPrograms(List<String> programs) {
		this.programs = programs;
	}

	public List<String> getHobbies() {
		return hobbies;
	}

	public void setHobbies(List<String> hobbies) {
		this.hobbies = hobbies;
	}

	public String getBio() {
		return bio;
	}

	public void setBio(String bio) {
		this.bio = bio;
	}

	public List<String> getPrefClasses() {
		return prefClasses;
	}

	public void setPrefClasses(List<String> prefClasses) {
		this.prefClasses = prefClasses;
	}

	public List<String> getPrefMajors() {
		return prefMajors;
	}

	public void setPrefMajors(List<String> prefMajors) {
		this.prefMajors = prefMajors;
	}

	public List<String> getPrefGreek() {
		return prefGreek;
	}

	public void setPrefGreek(List<String> prefGreek) {
		this.prefGreek = prefGreek;
	}

	public List<String> getPrefPrograms() {
		return prefPrograms;
	}

	public void setPrefPrograms(List<String> prefPrograms) {
		this.prefPrograms = prefPrograms;
	}

	public List<String> getPrefHobbies() {
		return prefHobbies;
	}

	public void setPrefHobbies(List<String> prefHobbies) {
		this.prefHobbies = prefHobbies;
	}

	public Map<String, Integer> getPriorities() {
		return priorities;
	}

	public void setPriorities(Map<String, Integer> priorities) {
		this.priorities = priorities;
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
				", classes=" + classes +
				", majors=" + majors +
				", greek=" + greek +
				", programs=" + programs +
				", hobbies=" + hobbies +
				", prefClasses=" + prefClasses +
				", prefMajors=" + prefMajors +
				", prefGreek=" + prefGreek +
				", prefPrograms=" + prefPrograms +
				", prefHobbies=" + prefHobbies +
				", priorities=" + priorities +
				'}';
	}
}
