package com.hoovereats.authenticate;

import com.google.firebase.auth.UserRecord;

import com.hoovereats.profile.Swipe;
import com.hoovereats.profile.User;
import com.hoovereats.profile.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;

@RestController
public class AuthenticateController {

	Logger logger = LoggerFactory.getLogger(AuthenticateController.class);

	@Autowired
	UserRepository userRepository;
	@PostMapping("/auth")
	public void index(@RequestAttribute("userRecord") UserRecord userRecord){
		User user;
		String uid = userRecord.getUid();
		try {
			user = userRepository.findUserByUId(uid);
			if (user == null) {
				String email = userRecord.getEmail();
				String defaultUsername = email.substring(0, email.indexOf('@'));
				if (email.contains("_")) {
					int gradYear = Integer.parseInt(email.substring(email.indexOf('_') + 1, email.indexOf('@')));
					user = new User(uid, userRecord.getDisplayName(), defaultUsername, userRecord.getEmail(), "student", Swipe.NEITHER,  gradYear, null);
				} else {
					user = new User(uid, userRecord.getDisplayName(), defaultUsername, userRecord.getEmail(), "faculty", Swipe.NEITHER, null, null);
				}
				userRepository.save(user);
				logger.info("New User Created " + user);
			}
		} catch (NoResultException e) {
			//ignore for now
		}
	}
}
