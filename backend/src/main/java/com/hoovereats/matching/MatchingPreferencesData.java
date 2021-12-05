package com.hoovereats.matching;

import java.util.Arrays;
import java.util.Calendar;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class MatchingPreferencesData {

	public static final List<String> CLASSES;
	public static final Set<String> MAJORS;
	public static final List<String> STUDENT_PROGRAMS;
	public static final TreeSet<String> GREEK_LIFE;
	public static final TreeSet<String> HOBBIES;
	public static final HashMap<String, Collection<String>> OPTIONS_INFO;
	public static final HashMap<String, Integer> STRING_TO_YEAR_LOOKUP;
	public static final HashMap<Integer, String> YEAR_TO_STRING_LOOKUP;

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

		OPTIONS_INFO = new HashMap<>();
		OPTIONS_INFO.put("classes", CLASSES);
		OPTIONS_INFO.put("majors", MAJORS);
		OPTIONS_INFO.put("greek", GREEK_LIFE);
		OPTIONS_INFO.put("hobbies", HOBBIES);
		OPTIONS_INFO.put("programs", STUDENT_PROGRAMS);

		STRING_TO_YEAR_LOOKUP = new HashMap<>();
		YEAR_TO_STRING_LOOKUP = new HashMap<>();
		boolean fallTerm = Calendar.getInstance().get(Calendar.MONTH) > 6;
		int currentYear = Calendar.getInstance().get(Calendar.YEAR);
		STRING_TO_YEAR_LOOKUP.put("Freshman", fallTerm?currentYear+4:currentYear+3);
		STRING_TO_YEAR_LOOKUP.put("Sophomore", fallTerm?currentYear+3:currentYear+2);
		STRING_TO_YEAR_LOOKUP.put("Junior", fallTerm?currentYear+2:currentYear+1);
		STRING_TO_YEAR_LOOKUP.put("Senior", fallTerm?currentYear+1:currentYear);
		YEAR_TO_STRING_LOOKUP.put(fallTerm?currentYear+4:currentYear+3, "Freshman");
		YEAR_TO_STRING_LOOKUP.put(fallTerm?currentYear+3:currentYear+2, "Sophomore");
		YEAR_TO_STRING_LOOKUP.put(fallTerm?currentYear+2:currentYear+1, "Junior");
		YEAR_TO_STRING_LOOKUP.put(fallTerm?currentYear+1:currentYear, "Senior");
	}

}
