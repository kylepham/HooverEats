package com.hoovereats.profile;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;

	@GetMapping(value="/profile/{username}", produces = MediaType.APPLICATION_JSON_VALUE)
	public User index(@PathVariable String username) {
		User user = userRepository.findUserByUsername(username);
		return user;
	}

}
