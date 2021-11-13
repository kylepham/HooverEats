package com.hoovereats.messaging.models;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ConversationRepository extends CrudRepository<Conversation, Integer> {

	@Query("SELECT c FROM Conversation c WHERE (c.senderUid = ?1 and c.recipientUid = ?2) OR (c.senderUid = ?2 and c.recipientUid = ?1)")
	Conversation findConversationId(String senderUid, String recipientUid);

	@Query("SELECT c FROM Conversation c WHERE (c.id = ?1)")
	Conversation getConversationById(int conversationId);

	@Query("SELECT c FROM Conversation c WHERE c.senderUid = ?1 or c.recipientUid = ?1")
	List<Conversation> findTop10ByUserId(String uid);

}
