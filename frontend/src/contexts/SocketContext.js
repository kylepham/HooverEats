import { createContext, useEffect, useState } from "react";
import { getLocalStorage } from "../utils";
import { Client } from "@stomp/stompjs";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  let clientHelper;
  const [client, setClient] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [uid, setUid] = useState(null);
  const [recipientUid, setRecipientUid] = useState(null);
  const [recipientName, setRecipientName] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [conversationDict, setConversationDict] = useState({});
  const [currentMessages, setCurrentMessages] = useState(null);
  const [conversations, setConversations] = useState(null);
  const value = {
    client,
    socketConnected,
    recipientUid,
    setRecipientUid,
    recipientName,
    setRecipientName,
    conversationId,
    setConversationId,
    conversationDict,
    setConversationDict,
    currentMessages,
    setCurrentMessages,
    conversations,
    setConversations,
  };

  window.addEventListener("storage", (e) => {
    if (!!e.newValue) setUid(JSON.parse(e.newValue));
  });

  useEffect(() => {
    if (!getLocalStorage("uid")) return;

    if (!clientHelper) {
      clientHelper = new Client({
        brokerURL: "wss://twiki.csc.depauw.edu/ws",
        connectHeaders: {},
        debug: console.log,
        onConnect: function () {
          setSocketConnected(true);
          clientHelper.subscribe(
            "/user/" + getLocalStorage("uid") + "/queue/messages",
            ({ body }) => {
              body = JSON.parse(body);
              setConversationId((conversationId) => {
                setConversationDict((dict) => {
                  if (!dict[body["conversationId"]]) {
                    dict[body["conversationId"]] = []
                  }
                  const messages = [...dict[body["conversationId"]]];
                  if (
                    messages.filter((message) => message.id === body.id)
                      .length === 0
                  ) {
                    messages.push(body);
                    dict[body["conversationId"]] = messages;
                  }
                return { ...dict };
                });

                setConversations((conversations) => {
                  let conversation = conversations.filter(
                    (conversation) => conversation.conversationId === body["conversationId"]
                  )[0];
                  if (!conversation) {
                    if (body["senderUid"] === getLocalStorage("uid")) {
                      conversation = {
                        conversationId: body["conversationId"],
                        senderUid: body["senderUid"],
                        senderPhotoUrl: body["senderPhotoUrl"],
                        recipientUid: body["recipientUid"],
                        recipientPhotoUrl: body["recipientPhotoUrl"],
                        recipientName: body["recipientName"],
                      };
                    } else {
                      conversation = {
                        conversationId: body["conversationId"],
                        senderUid: body["recipientUid"],
                        senderPhotoUrl: body["recipientPhotoUrl"],
                        recipientUid: body["senderUid"],
                        recipientPhotoUrl: body["senderPhotoUrl"],
                        recipientName: body["senderName"],
                      };
                    }
                    conversations.push(conversation);
                  }
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
                if (!conversationId) return body["conversationId"];
                return conversationId;
              });
            }
          );
        },
        reconnectDelay: 10000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });
      setClient(clientHelper);
    }
  }, [uid]);

  useEffect(() => {
    if (client) client.activate();
  }, [client]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
