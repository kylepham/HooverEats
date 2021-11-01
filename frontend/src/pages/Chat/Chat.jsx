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
      <img src={conversation.recipientPhotoUrl} alt="" />
      <p>{conversation.recipientName}</p>
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
  const [message, setMessage] = useState("");
  return (
    <>
      <div className={styles.chat_header}>
        <img src={conversation.recipientPhotoUrl} />
        <p>{conversation.recipientName}</p>
      </div>

      <div className={styles.chat_contents}>
        {messages.map((message, index) => (
          <Message
            key={index}
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
        />
        <button onClick={() => onSend(message)}>send</button>
      </div>
    </>
  );
};

export default function Chat() {
  const {
    user: { info },
  } = useContext(AuthContext);

  const [text, setText] = useState("");
  const [recipientUid, setRecipientUid] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [conversationId, setConversationId] = useState();
  const [conversationDict, setConversationDict] = useState({});
  const [conversations, setConversations] = useState([
    // {
    //   id: 1,
    //   name: "joshhn",
    //   photo:
    //     "https://pickaface.net/gallery/avatar/unr_example_170227_1250_yq2lr.png",
    //   messages: [
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Hoang",
    //     },
    //     {
    //       name: "Hoang Pham",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Duy",
    //     },
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Dcmm",
    //     },
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Hoang",
    //     },
    //     {
    //       name: "Hoang Pham",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Duy",
    //     },
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Dcmm",
    //     },
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Hoang",
    //     },
    //     {
    //       name: "Hoang Pham",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Duy",
    //     },
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Dcmm",
    //     },
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Hoang",
    //     },
    //     {
    //       name: "Hoang Pham",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Duy",
    //     },
    //     {
    //       name: "joshhn",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Dcmm",
    //     },
    //   ],
    // },
    // {
    //   id: 14,
    //   name: "kyleph",
    //   photo: "https://www.w3schools.com/w3images/avatar2.png",
    //   messages: [
    //     {
    //       name: "kyleph",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Hoang",
    //     },
    //     {
    //       name: "Hoang Pham",
    //       date: new Date().toLocaleTimeString(),
    //       message: "afdsaf",
    //     },
    //     {
    //       name: "Hoang Pham",
    //       date: new Date().toLocaleTimeString(),
    //       message: "asefafee",
    //     },
    //   ],
    // },
    // {
    //   id: 69,
    //   name: "andytle",
    //   photo: "https://www.lightningdesignsystem.com/assets/images/avatar2.jpg",
    //   messages: [
    //     {
    //       name: "Hoang Pham",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Hoang",
    //     },
    //     {
    //       name: "andytle",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Hello Duy",
    //     },
    //     {
    //       name: "andytle",
    //       date: new Date().toLocaleTimeString(),
    //       message: "Dcmm",
    //     },
    //   ],
    // },
  ]);

  const onConversationClick = async (conversationId) => {
    if (!conversationId) return;
    setConversationId(conversationId);
    const messages = await getAllMessagesByConversationId(conversationId);
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
    if (conversationDict[conversationId]) return;
    setConversationDict({ ...conversationDict, [conversationId]: messages });
  };

  console.log("conversations", conversations);
  console.log("convo dict:", conversationDict);
  console.log("rUid:", recipientUid);
  console.log("rName:", recipientName);

  var setDict = (message) => {
    console.log(
      conversationDict,
      conversationId,
      conversationDict[conversationId]
    );
    const newMessages = conversationDict[conversationId];
    newMessages.push(message);
    setConversationDict({
      ...conversationDict,
      [conversationId]: newMessages,
    });
  };

  useEffect(() => {
    if (!info) return;
    if (client) return;

    // choose seeing the first conversation (if existed)
    (async () => {
      const allConversations = await getAllConversations();
      setConversations(allConversations);
      setConversationId(0);
      onConversationClick(allConversations[0]?.id);
      setRecipientUid(allConversations[0]?.recipientUid);
      setRecipientName(allConversations[0]?.recipientName);
    })();

    client = new Client({
      brokerURL: "wss://twiki.csc.depauw.edu:5000/ws",
      connectHeaders: {},
      debug: (msg) => {
        console.log(msg);
      },
      onConnect: function () {
        client.subscribe(
          "/user/" + info.uid + "/queue/messages",
          ({ body }) => {
            console.log("incoming", body);
            // setDict(JSON.parse(body));
          }
        );
      },
      reconnectDelay: 10000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });
    if (client)
      client.subscribe("/user/" + info.uid + "/queue/messages", ({ body }) => {
        console.log("incoming", body);
        setDict(JSON.parse(body));
      });
    client.activate();
  }, [info, client]);

  const sendMessage = (text) => {
    console.log(text);
    const message = {
      senderUid: info.uid,
      recipientUid,
      senderName: info.name,
      recipientName: "Hahas",
      content: text,
      timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
    };

    const newMessages = conversationDict[conversationId];
    newMessages.push(message);
    setConversationDict({ ...conversationDict, [conversationId]: newMessages });

    client.publish({ destination: "/app/chat", body: JSON.stringify(message) });
    // setTexts([...text, `${info.name} - ${text}`]);
  };

  if (!info) return <div></div>;

  console.log("uid", info.uid);

  // return (
  //   <div>
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />
  //     <br />

  //     <button onClick={async () => await client.deactivate()}>
  //       disconnect
  //     </button>
  //     <br />
  //     <input
  //       type="text"
  //       placeholder="to..."
  //       value={recipientUid}
  //       onChange={(e) => setRecipientUid(e.target.value)}
  //     />
  //     <br />
  //     <input
  //       type="text"
  //       placeholder="message..."
  //       value={text}
  //       onChange={(e) => setText(e.target.value)}
  //     />
  //     <br />
  //     <button onClick={sendMessage}>send</button>
  //     <br />
  //     <button onClick={getMessages}>get messages</button>

  //     {texts &&
  //       texts.map((text, index) => (
  //         <p style={{ color: "#fff" }} key={index}>
  //           {text}
  //         </p>
  //       ))}
  //   </div>
  // );

  console.log(conversationId);
  return (
    <div className={styles.container}>
      {/* <button onClick={getMessages}> asdfa</button> */}
      <div className={styles.conversation_container}>
        {conversations &&
          conversations.map((conversation, index) => (
            <Conversation
              key={`${new Date().getTime()} - ${index}`}
              conversation={conversation}
              chosenId={conversationId}
              onClick={() => onConversationClick(conversation.id)}
            />
          ))}
      </div>

      {conversationId && conversationDict[conversationId] && (
        <div className={styles.chat_container}>
          <CurrentConversation
            conversation={
              conversations.filter(
                (conversation) => conversation.id === conversationId
              )[0]
            }
            messages={conversationDict[conversationId]}
            info={info}
            onSend={sendMessage}
          />
        </div>
      )}
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
