package com.hoovereats.matching;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.TreeMap;
import java.util.TreeSet;

public class MatchingPreferencesData {

	public static final List<String> CLASSES;
	public static final Set<String> MAJORS;
	public static final List<String> STUDENT_PROGRAMS;
	public static final TreeSet<String> GREEK_LIFE;
	public static final TreeSet<String> HOBBIES;
	public static final TreeMap<String, Collection<String>> MATCHING_PREFERENCES_DATA;
	public static final HashMap<String, String> PREFERENCES_LOOKUP;
	public static final HashMap<String, Integer> YEAR_LOOKUP;

	static {
		CLASSES = Arrays.asList("Freshman", "Sophomore", "Junior", "Senior", "Alumni", "Faculty", "Visitor");
		MAJORS = new TreeSet<>(Arrays.asList("Actuarial Science", "Africana Studies", "Anthropology", "Art History",
				"Asian Studies", "Biochemistry", "Biology", "Cellular and Molecular Biology", "Chemistry",
				"Chinese Studies", "Classical Civilization", "Communication", "Computer Science", "Earth Science",
				"Economics", "Education Studies", "English (Literature)", "English (Writing)", "Environmental Biology",
				"Environmental Geoscience", "Film Studies", "Geology", "German", "German Studies", "Global French Studies",
				"Global Health", "Greek", "Hispanic Studies", "History", "Independent Interdisciplinary",
				"Italian Cultural Studies", "Japanese Studies", "Kinesiology", "Latin", "Mathematics", "Music/School of Music",
				"Neuroscience", "Peace and Conflict Studies", "Philosophy", "Physics", "Political Science", "Pre-engineering",
				"Psychology", "Religious Studies", "Romance Languages", "Sociology", "Studio Art", "Theatre",
				"Women's, Gender, and Sexuality Studies"));
		GREEK_LIFE = new TreeSet<>(Arrays.asList("Alpha Chi Omega", "Alpha Kappa Alpha Sorority",
				"Alpha Phi Alpha Fraternity", "Alpha Phi", "Alpha Tau Omega", "Beta Theta Pi", "Delta Gamma",
				"Delta Tau Delta", "Delta Upsilon", "Kappa Alpha Psi Fraternity", "Kappa Alpha Theta", "Kappa Kappa Gamma",
				"Lambda Sigma Upsilon Latino Fraternity", "Mu Sigma Upsilon Sorority", "Omega Phi Beta Sorority",
				"Phi Delta Theta", "Phi Gamma Delta", "Phi Kappa Psi", "Pi Beta Phi", "Psi Lambda Xi", "Sigma Chi",
				"Sigma Lambda Gamma National Sorority", "Sigma Nu", "Zeta Phi Beta Sorority"));
		HOBBIES = new TreeSet<>(Arrays.asList("Writing", "Reading", "Photography", "Sports", "Drawing", "Cooking", "DIY",
				"Coding", "Content Creation", "Dancing", "Meditation", "Languages", "Music", "Volunteering", "Gym", "Art",
				"Film", "Gaming", "Partying"));
		STUDENT_PROGRAMS = Arrays.asList("Honor Scholars", "Media Fellows", "Management Fellows",
				"Environmental Fellows", "Science Research Fellows", "ITAP");
		MATCHING_PREFERENCES_DATA = new TreeMap<>();
		MATCHING_PREFERENCES_DATA.put("Classes", CLASSES);
		MATCHING_PREFERENCES_DATA.put("Majors", MAJORS);
		MATCHING_PREFERENCES_DATA.put("Greek", GREEK_LIFE);
		MATCHING_PREFERENCES_DATA.put("Hobbies", HOBBIES);
		MATCHING_PREFERENCES_DATA.put("Student Programs", STUDENT_PROGRAMS);

		PREFERENCES_LOOKUP = new HashMap<>();
		for (String topic : MATCHING_PREFERENCES_DATA.keySet()) {
			for (String entry : MATCHING_PREFERENCES_DATA.get(topic)) {
				PREFERENCES_LOOKUP.put(entry, topic);
			}
		}
		PREFERENCES_LOOKUP.put("Alumni", "Others");
		PREFERENCES_LOOKUP.put("Faculty", "Others");
		PREFERENCES_LOOKUP.put("Visitor", "Others");

		YEAR_LOOKUP = new HashMap<>();
		boolean fallTerm = Calendar.getInstance().get(Calendar.MONTH) > 6;
		int currentYear = Calendar.getInstance().get(Calendar.YEAR);
		YEAR_LOOKUP.put("Freshman", fallTerm?currentYear+4:currentYear+3);
		YEAR_LOOKUP.put("Sophomore", fallTerm?currentYear+3:currentYear+2);
		YEAR_LOOKUP.put("Junior", fallTerm?currentYear+2:currentYear+1);
		YEAR_LOOKUP.put("Senior", fallTerm?currentYear+1:currentYear);
	}

}
