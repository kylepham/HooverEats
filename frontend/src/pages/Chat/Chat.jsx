import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { Client } from "@stomp/stompjs";
import styles from "./Chat.module.css";
import {
  getAllConversations,
  getAllMessagesByConversationId,
} from "../../utils";

let client;

const Conversation = ({ conversation, chosenId, ...rest }) => {
  return (
    <div
      className={`${styles.conversation} ${
        chosenId === conversation.id ? styles.conversation_active : ""
      }`}
      {...rest}
    >
      <img
        src={conversation.recipientPhotoUrl}
        alt={conversation.recipientName}
      />
      <div className={styles.conversation_info}>
        <p>{conversation.recipientName}</p>
        <div className={styles.conversation_text_time}>
          <p>{conversation.text}</p>
          <p> · </p>
          <p>
            {new Date(conversation.timestamp).toLocaleTimeString("en-US", {
              timeStyle: "short",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

const Message = ({ message, isMe }) => {
  return (
    <div className={styles.message_container}>
      {isMe ? (
        <>
          <div className={styles.space} />
          <div className={`${styles.message} ${styles.my_message}`}>
            <div className={`${styles.background} ${styles.my_background}`}>
              <p>{message.content}</p>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className={styles.message}>
            <div className={styles.background}>
              <p>{message.content}</p>
            </div>
          </div>
          <div className={styles.space} />
        </>
      )}
    </div>
  );
};

const CurrentConversation = ({ conversation, messages, onSend, info }) => {
  // console.log("currentMessages:", messages);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    onSend(message);
    setMessage("");
  };
  return (
    <>
      <div className={styles.chat_header}>
        <img
          src={conversation.recipientPhotoUrl}
          alt={conversation.recipientName}
        />
        <p>{conversation.recipientName}</p>
      </div>

      <div className={styles.chat_contents}>
        {messages.map((message, index) => (
          <Message
            key={`${new Date().getTime()} ${index}`}
            message={message}
            isMe={info.uid === message.senderUid}
          />
        ))}
      </div>

      <div className={styles.chat_textarea}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (!(e.key === "Enter")) return;
            sendMessage();
          }}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </>
  );
};

export default function Chat() {
  const {
    user: { info },
  } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [recipientUid, setRecipientUid] = useState(null);
  const [recipientName, setRecipientName] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [conversationDict, setConversationDict] = useState({});
  const [currentMessages, setCurrentMessages] = useState(null);
  const [conversations, setConversations] = useState(null);

  const onConversationClick = async (conversationId) => {
    if (!conversationId) return;

    // modify conversationDict & conversationId
    if (!conversationDict[conversationId]) {
      const messages = await getAllMessagesByConversationId(conversationId);
      setConversationDict({
        ...conversationDict,
        [conversationId]: messages,
      });
    }
    setConversationId(conversationId);

    // modify recipientUid & recipientName
    if (conversations.length) {
      setRecipientUid(
        conversations.filter(
          (conversation) => conversation.id === conversationId
        )[0]?.recipientUid
      );
      setRecipientName(
        conversations.filter(
          (conversation) => conversation.id === conversationId
        )[0]?.recipientName
      );
    }
  };

  // console.log("conversations", conversations);
  // console.log("convo dict:", conversationDict);
  // console.log("rUid:", recipientUid);
  // console.log("rName:", recipientName);
  // console.log("currentMessages:", currentMessages);

  useEffect(() => {
    if (!info) return;
    if (client) return;

    // choose seeing the first conversation (if existed)
    (async () => {
      const allConversations = await getAllConversations();
      if (!allConversations) return;
      setConversations(
        allConversations.sort(
          (prev, next) => new Date(next.timestamp) - new Date(prev.timestamp)
        )
      );

      const conversationId = allConversations[0]?.id;
      setConversationId(conversationId);
      if (conversationId) {
        const messages = await getAllMessagesByConversationId(conversationId);
        setConversationDict({ [conversationId]: messages });

        // modify recipientUid & recipientName
        if (allConversations.length) {
          setRecipientUid(
            allConversations.filter(
              (conversation) => conversation.id === conversationId
            )[0]?.recipientUid
          );
          setRecipientName(
            allConversations.filter(
              (conversation) => conversation.id === conversationId
            )[0]?.recipientName
          );
        }
      }
    })();

    client = new Client({
      brokerURL: "wss://twiki.csc.depauw.edu/ws",
      connectHeaders: {},
      debug: (msg) => {
        console.log(msg);
      },
      onConnect: function () {
        client.subscribe(
          "/user/" + info.uid + "/queue/messages",
          ({ body }) => {
            // console.log("add msg onconnected");
            body = JSON.parse(body);
            setConversationId((conversationId) => {
              setConversationDict((dict) => {
                if (dict[body["conversationId"]]) {
                  const messages = [...dict[body["conversationId"]]];
                  if (
                    messages.filter((message) => message.id === body.id)
                      .length === 0
                  ) {
                    // console.log(messages);
                    messages.push(body);
                    dict[body["conversationId"]] = messages;
                  }
                }
                return { ...dict };
              });

              setConversations((conversations) => {
                const conversation = conversations.filter(
                  (conversation) => conversation.id === body["conversationId"]
                )[0];
                conversation.timestamp = body["timestamp"];
                conversation.text = body["content"];
                conversation.lastSenderName = body["senderName"];
                return [
                  ...conversations.sort(
                    (prev, next) =>
                      new Date(next.timestamp) - new Date(prev.timestamp)
                  ),
                ];
              });
              return conversationId;
            });
          }
        );
      },
      reconnectDelay: 10000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    client.activate();
  }, [info, client]);

  // watch changes on conversationDict
  useEffect(() => {
    let chat_contents = document.getElementsByClassName(styles.chat_contents);
    if (chat_contents && chat_contents.length) {
      chat_contents = chat_contents[0];
      chat_contents.scrollTo({
        top: chat_contents.scrollHeight,
      });
    }

    // update currentMessages
    if (conversationDict[conversationId])
      setCurrentMessages(conversationDict[conversationId]);
  }, [conversationDict, conversationId, currentMessages]);

  const sendMessage = (text) => {
    const message = {
      senderUid: info.uid,
      recipientUid,
      senderName: info.name,
      recipientName: recipientName,
      content: text,
      timestamp: new Date().getTime(),
    };

    const newMessages = conversationDict[conversationId];
    newMessages.push(message);
    setConversationDict({
      ...conversationDict,
      [conversationId]: newMessages,
    });
    setConversations(
      conversations
        .map((conversation) => {
          if (conversation.id === conversationId)
            conversation = {
              ...conversation,
              lastSenderName: info.name,
              timestamp: new Date().getTime(),
              text,
            };
          return conversation;
        })
        .sort(
          (prev, next) => new Date(next.timestamp) - new Date(prev.timestamp)
        )
    );

    client.publish({
      destination: "/app/chat",
      body: JSON.stringify(message),
    });
  };

  if (!info) return <div></div>;

  return (
    <div className={styles.container}>
      <div className={styles.conversation_container}>
        {!conversations && <p>Loading</p>}
        {conversations && conversations.length === 0 && (
          <p>You have no conversations.</p>
        )}
        {conversations &&
          conversations.map((conversation, index) => (
            <Conversation
              key={index}
              conversation={conversation}
              chosenId={conversationId}
              onClick={() => {
                onConversationClick(conversation.id);
              }}
            />
          ))}
      </div>

      {conversationId && currentMessages && (
        <div className={styles.chat_container}>
          <CurrentConversation
            conversation={
              conversations.filter(
                (conversation) => conversation.id === conversationId
              )[0]
            }
            messages={currentMessages}
            info={info}
            onSend={sendMessage}
          />
        </div>
      )}

      {/* Initiate conversation with specified recipientUid && text */}
      {/* <input
        type="text"
        placeholder="to..."
        value={recipientUid}
        onChange={(e) => setRecipientUid(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <br />
      <button onClick={() => sendMessage(text)}>send</button> */}
    </div>
  );
}
