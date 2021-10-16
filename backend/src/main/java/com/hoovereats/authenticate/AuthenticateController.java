package com.hoovereats.authenticate;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.hoovereats.mysql.User;
import com.hoovereats.mysql.UserRepository;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.persistence.NoResultException;
import java.util.*;

@RestController
public class AuthenticateController {

	Logger logger = LoggerFactory.getLogger(AuthenticateController.class);

	@Autowired
	UserRepository userRepository;
	@PostMapping("/auth")
	public void index(@RequestHeader Map<String, String> headers, @RequestAttribute("userRecord") UserRecord userRecord){
		User user;
		String uid = userRecord.getUid();
		try {
			user = userRepository.findUserByUId(uid);
			if (user == null) {
				String email = userRecord.getEmail();
				String defaultUsername = email.substring(0, email.indexOf('@'));
				if (email.contains("_")) {
					int gradYear = Integer.parseInt(email.substring(email.indexOf('_') + 1, email.indexOf('@')));
					user = new User(uid, userRecord.getDisplayName(), defaultUsername, userRecord.getEmail(), "student", gradYear, null);
				} else {
					user = new User(uid, userRecord.getDisplayName(), defaultUsername, userRecord.getEmail(), "faculty", null, null);
				}
				userRepository.save(user);
				logger.info("New User Created " + user);
			}
		} catch (NoResultException e) {
			//ignore for now
		}
	}
}
