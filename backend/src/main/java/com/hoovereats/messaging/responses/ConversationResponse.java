package com.hoovereats.messaging.responses;

public class ConversationResponse {

	private int id;
	private String recipientName;
	private String recipientUid;
	private String recipientPhotoUrl;
	private String lastRecipientName;
	private String text;
	private String timestamp;

	public ConversationResponse(int id, String recipientName, String recipientUid, String recipientPhotoUrl, String lastRecipientName, String text, String timestamp) {
		this.id = id;
		this.recipientName = recipientName;
		this.recipientUid = recipientUid;
		this.recipientPhotoUrl = recipientPhotoUrl;
		this.lastRecipientName = lastRecipientName;
		this.text = text;
		this.timestamp = timestamp;
	}
}
