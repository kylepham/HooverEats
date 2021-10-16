package com.hoovereats;

import com.google.gson.GsonBuilder;
import com.hoovereats.mysql.User;
import com.hoovereats.mysql.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;
	static Gson gson = new GsonBuilder()
			.serializeNulls()
			.create();

	@GetMapping("/profile/{username}")
	public String index(@PathVariable String username) {
		User user = userRepository.findUserByUsername(username);
		return gson.toJson(user);
	}

}
