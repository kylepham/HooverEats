package com.hoovereats.matching.responses;

import com.hoovereats.profile.User;

import java.util.ArrayList;

public class MatchingResultResponse {
	public User user;
	public double score;
	public ArrayList<String> reason;

	public MatchingResultResponse(User user, double score, ArrayList<String> reason) {
		this.user = user;
		this.score = score;
		this.reason = reason;
	}

}
