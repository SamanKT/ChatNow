import React, { useContext, useEffect, useState } from "react";
import InputMessage from "../InputMessage/InputMessage";
import Message from "./Message";
import { ChatContext } from "../../Context/ChatContext";
import { db, setMessageAsRead } from "../../Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import "../../messageStyles.css";
const Messages = () => {
  const { friend, currentUser, dispatch } = useContext(ChatContext);
  const [messages, setMessages] = useState([]);
  const [disableSend, setDisableSend] = useState(false);

  useEffect(() => {
    let unsub = () => {};
    if (friend.combinedId) {
      const ref = doc(db, "chats", friend.combinedId);

      unsub = onSnapshot(ref, (doc) => {
        let data = doc?.data();
        data = { ...data };
        setMessages(data.messages);
      });
      setDisableSend(false);
    } else setDisableSend(true);

    return () => {
      unsub();
    };
  }, [friend.combinedId]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
      onLoad={async () =>
        setMessageAsRead(currentUser.uid, friend.friend.friendInfo.uid)
      }
    >
      <div
        className="scroll"
        style={{
          height: "calc(85vh - 85px)",
          overflowY: "auto",
        }}
      >
        {messages?.length > 0 &&
          messages.map((message) => {
            return (
              <Message
                owner={currentUser.uid === message.senderId ? true : false}
                body={message.body}
                photoUrl={
                  currentUser.uid === message.senderId
                    ? currentUser.photoURL
                    : friend.friend.friendInfo.photoURL
                }
                image={message.file}
                date={message.time}
                key={message.id}
              />
            );
          })}
      </div>
      <InputMessage disableSend={disableSend}></InputMessage>
    </div>
  );
};

export default Messages;
