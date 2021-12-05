package com.hoovereats.profile;

import javax.persistence.AttributeConverter;
import java.util.HashMap;
import java.util.Map;

public class ListPrioritiesConverter implements AttributeConverter<Map<String, Integer>, String> {

	public static final Map<String, Integer> DEFAULT_PRIORITIES_MAP;
	private static final String PREFERENCES_SEPARATOR = ";";
	private static final String PRIORITY_SEPARATOR = "~";

	static {
		DEFAULT_PRIORITIES_MAP = new HashMap<>();
		DEFAULT_PRIORITIES_MAP.put("majors", 1);
		DEFAULT_PRIORITIES_MAP.put("hobbies", 1);
		DEFAULT_PRIORITIES_MAP.put("programs", 1);
		DEFAULT_PRIORITIES_MAP.put("classes", 1);
		DEFAULT_PRIORITIES_MAP.put("greek", 1);
	}

	@Override
	public Map<String, Integer> convertToEntityAttribute(String s) {
		if (s == null || s.isEmpty()) return DEFAULT_PRIORITIES_MAP;
		Map<String, Integer> map = new HashMap<>();
		for (String string : s.split(PREFERENCES_SEPARATOR)) {
			if (!string.isEmpty()) {
				map.put(string.split(PRIORITY_SEPARATOR)[0],
						Integer.parseInt(string.split(PRIORITY_SEPARATOR)[1]));
			}
		}
		return map;
	}

	@Override
	public String convertToDatabaseColumn(Map<String, Integer> map) {
		if (map == null || map.isEmpty()) return null;
		StringBuilder sb = new StringBuilder();
		for (String preference : map.keySet()) {
			sb.append(preference).append(PRIORITY_SEPARATOR).append(map.get(preference))
					.append(PREFERENCES_SEPARATOR);
		}
		sb.setLength(sb.length()-1);
		return sb.toString();
	}

}
