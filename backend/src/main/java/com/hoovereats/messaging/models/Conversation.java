package com.hoovereats.messaging.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity // This tells Hibernate to make a table out of this class
public class Conversation {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	@Column(name = "sender_uid")
	private String senderUid;
	@Column(name = "sender_name")
	private String senderName;
	@Column(name = "sender_photo_url")
	private String senderPhotoUrl;
	@Column(name = "recipient_uid")
	private String recipientUid;
	@Column(name = "recipient_name")
	private String recipientName;
	@Column(name = "recipient_photo_url")
	private String recipientPhotoUrl;

	public Conversation(String senderUid, String senderName, String senderPhotoUrl, String recipientUid, String recipientName, String recipientPhotoUrl) {
		this.senderUid = senderUid;
		this.senderName = senderName;
		this.senderPhotoUrl = senderPhotoUrl;
		this.recipientUid = recipientUid;
		this.recipientName = recipientName;
		this.recipientPhotoUrl = recipientPhotoUrl;
	}

	public Conversation() {

	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getSenderUid() {
		return senderUid;
	}

	public void setSenderUid(String senderUid) {
		this.senderUid = senderUid;
	}

	public String getSenderName() {
		return senderName;
	}

	public void setSenderName(String senderName) {
		this.senderName = senderName;
	}

	public String getSenderPhotoUrl() {
		return senderPhotoUrl;
	}

	public void setSenderPhotoUrl(String senderPhotoUrl) {
		this.senderPhotoUrl = senderPhotoUrl;
	}

	public String getRecipientUid() {
		return recipientUid;
	}

	public void setRecipientUid(String recipientUid) {
		this.recipientUid = recipientUid;
	}

	public String getRecipientName() {
		return recipientName;
	}

	public void setRecipientName(String recipientName) {
		this.recipientName = recipientName;
	}

	public String getRecipientPhotoUrl() {
		return recipientPhotoUrl;
	}

	public void setRecipientPhotoUrl(String recipientPhotoUrl) {
		this.recipientPhotoUrl = recipientPhotoUrl;
	}
}
