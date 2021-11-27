package com.hoovereats.profile;

import javax.persistence.AttributeConverter;
import java.util.ArrayList;
import java.util.List;

public class ListPreferencesConverter implements AttributeConverter<List<Preference>, String> {

	private static final String PREFERENCES_SEPARATOR = ";";
	private static final String PRIORITY_SEPARATOR = "~";

	@Override
	public List<Preference> convertToEntityAttribute(String s) {
		if (s == null) return null;
		ArrayList<Preference> set = new ArrayList<>();
		for (String string : s.split(PREFERENCES_SEPARATOR)) {
			if (!string.isEmpty()) {
				set.add(new Preference(string.split(PRIORITY_SEPARATOR)[0],
						Integer.parseInt(string.split(PRIORITY_SEPARATOR)[1])));
			}
		}
		return set;
	}

	@Override
	public String convertToDatabaseColumn(List<Preference> list) {
		if (list == null || list.isEmpty()) return null;
		StringBuilder sb = new StringBuilder();
		for (int i = 0; i < list.size()-1; i++) {
			sb.append(list.get(i)).append(PREFERENCES_SEPARATOR);
		}
		sb.append(list.get(list.size()-1));
		return sb.toString();
	}

}
