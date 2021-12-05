package com.hoovereats.messaging;

import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.UserRecord;
import com.hoovereats.messaging.models.ClientMessage;
import com.hoovereats.messaging.models.Conversation;
import com.hoovereats.messaging.models.ConversationRepository;
import com.hoovereats.messaging.models.Message;
import com.hoovereats.messaging.models.MessageRepository;
import com.hoovereats.messaging.responses.ConversationResponse;
import com.hoovereats.profile.User;
import com.hoovereats.profile.UserRepository;
import com.hoovereats.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
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
	@Autowired private UserRepository userRepository;
	@Autowired private SimpMessagingTemplate messagingTemplate;

	@MessageMapping("/chat")
	public void processMessage(@Payload ClientMessage clientMessage) throws FirebaseAuthException {
		Conversation conversation = conversationRepository.findConversationId(clientMessage.getSenderUid(), clientMessage.getRecipientUid());
		User sender = userRepository.findUserByUId(clientMessage.getSenderUid());
		User recipient = userRepository.findUserByUId(clientMessage.getRecipientUid());
		if (conversation == null) {
			conversation = new Conversation(clientMessage.getSenderUid(), sender.getName(), sender.getPhotoUrl(),
					clientMessage.getRecipientUid(), recipient.getName(), recipient.getPhotoUrl());
			Conversation savedConversation = conversationRepository.save(conversation);
		}
		Integer conversationId = conversation.getId();
		Message receivedMessage = new Message(clientMessage.getSenderUid(), sender.getName(), sender.getPhotoUrl(),
											clientMessage.getRecipientUid(), recipient.getName(), recipient.getPhotoUrl(),
											clientMessage.getContent(), clientMessage.getTimestamp(), conversationId);

		Message sentMessage = messageRepository.save(receivedMessage);

		messagingTemplate.convertAndSendToUser(receivedMessage.getRecipientUid(), "/queue/messages", sentMessage);
		messagingTemplate.convertAndSendToUser(receivedMessage.getSenderUid(), "/queue/messages", sentMessage);

	}

	@GetMapping("/conversations")
	public String getConversations (@RequestAttribute("userRecord") UserRecord userRecord) {
		List<Conversation> conversationList = conversationRepository.findTop10ByUserId(userRecord.getUid());
		List<ConversationResponse> conversationsResponse = new ArrayList<>();
		for (Conversation conversation : conversationList) {
			ConversationResponse conversationResponse;
			Message lastMessage = messageRepository.findLastMessageByConversationId(conversation.getId());
			if (conversation.getSenderUid().equals(userRecord.getUid())) {
				conversationResponse = new ConversationResponse(conversation.getId(),
						conversation.getRecipientName(), conversation.getRecipientUid(), conversation.getRecipientPhotoUrl(),
						lastMessage.getSenderName(), lastMessage.getContent(), lastMessage.getTimestamp());
			} else {
				conversationResponse = new ConversationResponse(conversation.getId(),
						conversation.getSenderName(), conversation.getSenderUid(), conversation.getSenderPhotoUrl(),
						lastMessage.getSenderName(), lastMessage.getContent(), lastMessage.getTimestamp());
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
		return JsonUtils.toJsonString(messageRepository.findTop20MessageConversationIdOrderByIdDesc(conversationId));
	}
}
