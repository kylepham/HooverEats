package com.hoovereats.messaging.models;

public class ClientMessage {

	private String senderUid;
	private String recipientUid;
	private String content;
	private Long timestamp;

	public ClientMessage(String senderUid, String recipientUid, String content, Long timestamp) {
		this.senderUid = senderUid;
		this.recipientUid = recipientUid;
		this.content = content;
		this.timestamp = timestamp;
	}

	public String getSenderUid() {
		return senderUid;
	}

	public void setSenderUid(String senderUid) {
		this.senderUid = senderUid;
	}

	public String getRecipientUid() {
		return recipientUid;
	}

	public void setRecipientUid(String recipientUid) {
		this.recipientUid = recipientUid;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Long getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(Long timestamp) {
		this.timestamp = timestamp;
	}

}
