package com.hoovereats.messaging.models;

public class MessageNotification {
//	private Integer id;
	private String senderName;
	private String content;

	public MessageNotification(String senderName, String content) {
		this.senderName = senderName;
		this.content = content;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

}
