package com.hoovereats.profile;

import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
	@Autowired
	UserRepository userRepository;

	@GetMapping(value="/profile", produces = MediaType.APPLICATION_JSON_VALUE)
	public User getUserProfile(@RequestAttribute("userRecord") UserRecord userRecord) {
		return userRepository.findUserByUId(userRecord.getUid());
	}

	@PostMapping(value="/profile/update")
	public void updateUserProfile(@RequestBody User user) {
		userRepository.save(user);
	}

}
