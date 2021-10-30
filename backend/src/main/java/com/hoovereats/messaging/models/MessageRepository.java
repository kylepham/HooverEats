package com.hoovereats.messaging.models;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MessageRepository extends CrudRepository<Message, Integer> {

	@Query("SELECT c FROM Message c WHERE c.conversationId = ?1")
	List<Message> findTop20MessageConversationId(int conversationId);

}
