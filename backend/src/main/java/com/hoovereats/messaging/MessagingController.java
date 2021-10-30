package com.hoovereats.messaging;


import com.google.firebase.auth.UserRecord;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.hoovereats.messaging.models.Conversation;
import com.hoovereats.messaging.models.ConversationRepository;
import com.hoovereats.messaging.models.Message;
import com.hoovereats.messaging.models.MessageNotification;
import com.hoovereats.messaging.models.MessageRepository;
import com.hoovereats.messaging.responses.ConversationResponse;
import com.hoovereats.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestAttribute;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController

public class MessagingController {
	@Autowired private ConversationRepository conversationRepository;
	@Autowired private MessageRepository messageRepository;
	@Autowired private SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/chat")
	public void processMessage(@Payload Message message) {
		System.out.println(message);
		Conversation conversation = conversationRepository.findConversationId(message.getSenderUid(), message.getRecipientUid());
		if (conversation == null) {
			conversation = new Conversation(message.getSenderUid(), message.getSenderName(), message.getRecipientUid(), message.getRecipientName());
			Conversation savedConversation = conversationRepository.save(conversation);
			System.out.println(savedConversation);
		}
		System.out.println(conversation);
		Integer conversationId = conversation.getId();
		message.setConversationId(conversationId);

		Message sentMessage = messageRepository.save(message);

		messagingTemplate.convertAndSendToUser(message.getRecipientUid(),"/queue/messages", sentMessage);

	}

	@GetMapping("/conversations")
	public String getConversations (@RequestAttribute("userRecord") UserRecord userRecord) {
		List<Conversation> conversationList = conversationRepository.findTop10ByUserId(userRecord.getUid());
		List<ConversationResponse> conversationsResponse = new ArrayList<>();
		for (Conversation conversation : conversationList) {
			ConversationResponse conversationResponse;
			if (conversation.getSenderUid().equals(userRecord.getUid())) {
				conversationResponse = new ConversationResponse(conversation.getId(), conversation.getRecipientName(), conversation.getRecipientUid());
			} else {
				conversationResponse = new ConversationResponse(conversation.getId(), conversation.getSenderName(), conversation.getSenderUid());
			}
			conversationsResponse.add(conversationResponse);
		}
		return JsonUtils.toJsonString(conversationsResponse);
	}

	@GetMapping("/conversations/{conversationId}")
	public String getMessages (@RequestAttribute("userRecord") UserRecord userRecord, @PathVariable int conversationId, HttpServletResponse response) {
		Conversation conversation = conversationRepository.getConversationById(conversationId);
		String uid = userRecord.getUid();
		if (!uid.equals(conversation.getRecipientUid()) && !uid.equals(conversation.getSenderUid())) {
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
			return null;
		}
		return JsonUtils.toJsonString(messageRepository.findTop20MessageConversationId(conversationId));
	}
}
