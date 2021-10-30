package com.hoovereats.profile;

import com.hoovereats.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;

	@GetMapping("/profile/{username}")
	public String index(@PathVariable String username) {
		User user = userRepository.findUserByUsername(username);
		return JsonUtils.toJsonString(user);
	}

}
