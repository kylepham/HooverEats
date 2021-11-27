package com.hoovereats.messaging.models;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Integer> {

	@Query("SELECT c FROM Message c WHERE c.conversationId = ?1")
	List<Message> findTop20MessageConversationIdOrderByIdDesc(int conversationId);


	@Query(value = "SELECT * FROM message WHERE conversation_id = ?1 ORDER BY id DESC LIMIT 1", nativeQuery = true)
	Message findLastMessageByConversationId(int conversationId);

	@Query("SELECT c FROM Message c WHERE c.conversationId = ?1")
	List<Message> findMessageByConversationId(int conversationId);

}
