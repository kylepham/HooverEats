package com.hoovereats.messaging.responses;

public class ConversationResponse {

	private int id;
	private String recipientName;
	private String recipientUid;

	public ConversationResponse(int id, String recipientName, String recipientUid) {
		this.id = id;
		this.recipientName = recipientName;
		this.recipientUid = recipientUid;
	}
}
