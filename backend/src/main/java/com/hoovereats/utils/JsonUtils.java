package com.hoovereats.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonElement;

public class JsonUtils {

	static Gson gson = new GsonBuilder()
			.serializeNulls()
			.create();

	public static String toJsonString(Object object) {
		return gson.toJson(object);
	}

	public static JsonElement toJsonElement(Object object) {
		return gson.toJsonTree(object);
	}

}
