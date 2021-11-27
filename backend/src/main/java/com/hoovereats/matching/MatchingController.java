package com.hoovereats.matching;

import com.google.firebase.auth.UserRecord;
import com.hoovereats.matching.responses.MatchingResultResponse;
import com.hoovereats.profile.Preference;
import com.hoovereats.profile.User;
import com.hoovereats.profile.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.TreeMap;

@RestController
public class MatchingController {

	@Autowired
	UserRepository userRepository;

	@GetMapping(value="/matching", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<MatchingResultResponse> getReceivers(@RequestAttribute("userRecord") UserRecord userRecord) {
		return ranking(userRepository.findUserByUId(userRecord.getUid()),
				userRepository.findReceivingUser());
	}

	@GetMapping(value="/matching-preferences-data", produces = MediaType.APPLICATION_JSON_VALUE)
	public TreeMap<String, Collection<String>> getMatchingPreferencesData() {
		return MatchingPreferencesData.MATCHING_PREFERENCES_DATA;
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
		int score = 0;
		ArrayList<String> reasons = new ArrayList<>();
		for (Preference preference : currentUser.getPreferences()) {
			String preferenceName = preference.getPreference();
			int priority = preference.getPriority();
			String preferenceType = MatchingPreferencesData.PREFERENCES_LOOKUP.get(preferenceName);
			switch (preferenceType) {
				case "Majors":
					if (otherUser.getMajor().contains(preferenceName)) {
						score += priority;
						reasons.add(preferenceName);
					}
					break;
				case "Classes":
					int prefGradYear = MatchingPreferencesData.YEAR_LOOKUP.get(preferenceName);
					if (otherUser.getGradYear() == prefGradYear) {
						score += priority;
						reasons.add(preferenceName);
					}
					break;
				default:
					if (otherUser.getTags() != null && otherUser.getTags().contains(preferenceName)) {
						score += priority;
						reasons.add(preferenceName);
					}
					break;
			}
		}
		return new MatchingResultResponse(otherUser, score, reasons);
	}

}
