package com.hoovereats.matching;

import com.hoovereats.matching.responses.MatchingResultResponse;
import com.hoovereats.profile.Swipe;
import com.hoovereats.profile.User;
import com.hoovereats.profile.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;

@RestController
public class MatchingController {

	@Autowired UserRepository userRepository;

	@PostMapping(value="/matching", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<MatchingResultResponse> getReceivers(@RequestBody User user) {
		User savedUser = userRepository.save(user);
		if (savedUser.getType().equals(Swipe.GIVER)) {
			return ranking(savedUser, userRepository.findReceivingUser());
		}
		return null;
	}

	@GetMapping(value="/options-info", produces = MediaType.APPLICATION_JSON_VALUE)
	public HashMap<String, Collection<String>> getMatchingPreferencesData() {
		return MatchingPreferencesData.OPTIONS_INFO;
	}

	static List<MatchingResultResponse> ranking(User currentUser, List<User> otherUsers) {
		List<MatchingResultResponse> matchingResultResponses = new ArrayList<>();
		for (User otherUser : otherUsers) {
			matchingResultResponses.add(calculateScore(currentUser, otherUser));
		}

		matchingResultResponses.sort((o1, o2) -> -Double.compare(o1.score, o2.score));
		return matchingResultResponses;
	}

	static MatchingResultResponse calculateScore(User currentUser, User otherUser) {
		double score = 0;
		ArrayList<String> reasons = new ArrayList<>();
		if (currentUser.getPriorities() != null) {
			for (String preferenceType : currentUser.getPriorities().keySet()) {
				String capitalizedPreferenceType = preferenceType.substring(0, 1).toUpperCase() + preferenceType.substring(1);
				try {
					@SuppressWarnings("unchecked")
					List<String> userPreferences =
							(List<String>) User.class.getMethod("getPref" + capitalizedPreferenceType).invoke(currentUser);
					@SuppressWarnings("unchecked")
					List<String> otherUserFields =
							(List<String>) User.class.getMethod("get" + capitalizedPreferenceType).invoke(otherUser);
					if (!userPreferences.isEmpty() && !otherUserFields.isEmpty()) {
						double smallScore = currentUser.getPriorities().get(preferenceType) / (double) userPreferences.size();

						List<String> commonElements = new ArrayList<>(userPreferences);
						commonElements.retainAll(otherUserFields);

						score += smallScore * commonElements.size();
						reasons.addAll(commonElements);
					}
				} catch (NoSuchMethodException | IllegalAccessException | InvocationTargetException e) {
					e.printStackTrace();
				}
			}
		}
		return new MatchingResultResponse(otherUser, score, reasons);
	}

}
