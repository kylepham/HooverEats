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
	@Column(name = "recipient_uid")
	private String recipientUid;
	@Column(name = "recipient_name")
	private String recipientName;

	public Conversation(String senderUid, String senderName, String recipientUid, String recipientName) {
		this.senderUid = senderUid;
		this.senderName = senderName;
		this.recipientUid = recipientUid;
		this.recipientName = recipientName;
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

	@Override
	public String toString() {
		return "Conversation{" +
				"id=" + id +
				", senderUid='" + senderUid + '\'' +
				", senderName='" + senderName + '\'' +
				", recipientUid='" + recipientUid + '\'' +
				", recipientName='" + recipientName + '\'' +
				'}';
	}

}
