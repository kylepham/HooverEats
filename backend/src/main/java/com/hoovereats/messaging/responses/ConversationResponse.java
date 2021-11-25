package com.hoovereats.messaging.responses;

public class ConversationResponse {

	private int conversationId;
	private String recipientName;
	private String recipientUid;
	private String recipientPhotoUrl;
	private String lastSenderName;
	private String text;
	private Long timestamp;

	public ConversationResponse(int conversationId, String recipientName, String recipientUid, String recipientPhotoUrl,
								String lastSenderName, String text, Long timestamp) {
		this.conversationId = conversationId;
		this.recipientName = recipientName;
		this.recipientUid = recipientUid;
		this.recipientPhotoUrl = recipientPhotoUrl;
		this.lastSenderName = lastSenderName;
		this.text = text;
		this.timestamp = timestamp;
	}
}
