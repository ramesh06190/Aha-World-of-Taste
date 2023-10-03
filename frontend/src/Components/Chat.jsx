import React, { useState, useRef, useEffect } from "react";
import "./Chat.css"; // Import your CSS file
import io from "socket.io-client";
import { baseURL } from "../api/ApiService";
import { get, post } from "../api/ApiService";
import Chatimg from "../assets/chat2_116191.png"
function Chat() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);
  const roomId = localStorage.getItem("userId");
  console.log(roomId);
  const chatMessageParentRef = useRef(null);
  const admin = false;
  const socket = io(baseURL);

  useEffect(() => {
    if (roomId) {
      handleJoinRoom(roomId);
    }
  }, []);

  const handleJoinRoom = (roomId) => {
    socket.emit("join room", roomId);
  };

  const handleSendMessage = (message) => {
    socket.emit("send message", roomId, message, admin ? "admin" : "user");
  };

  socket.on("new message", (message) => {
    console.log(message, messages, "reciecee");
    if (messages) {
      // Update messages by creating a new array with the previous messages and the new message
      setMessages((prevMessages) => [...prevMessages, message]);
    }
  });
  useEffect(() => {
    socket.on("disconnect", () => {});
  }, []);

  useEffect(() => {
    socket.on("reconnect", (attemptNumber) => {});
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const sendMessage = () => {
    if (value.trim() === "") return;
    handleSendMessage(value);
    setValue("");
  };
  const GetChat = async (id) => {
    console.log("iddddd");
    const postData = {
      userId: id,
    };
    const result = await post("user/chat", postData);
    setMessages(result.data);
  };
  useEffect(() => {
    if (roomId) {
      GetChat(roomId);
    }
  }, []);

  useEffect(() => {
    if (chatMessageParentRef.current) {
      chatMessageParentRef.current.scrollTop =
        chatMessageParentRef.current.scrollHeight;
    }
  }, [messages]);
  console.log(messages, "list");
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return (
    <div className="chat-container">
      <div className={`chat ${isChatOpen ? "open" : "closed"}`}>
        <div className="chat-header" onClick={toggleChat}>
          Chat
        </div>
        <div className="chat-message-parent" ref={chatMessageParentRef}>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.sender === "user" ? "user" : "other"
                }`}
              >
                {msg.content}
                <p className="message-timestamp">
                  {formatTimestamp(msg.timestamp)}
                </p>
              </div>
            ))}
          </div>
        </div>
        {isChatOpen && (
          <div className="chat-input">
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={sendMessage} className="chat-sendbtn">Send</button>
          </div>
        )}
      </div>
      {roomId && (
        <button className="toggle-chat" onClick={toggleChat}>
          {isChatOpen ? <div className="toogle-close-chat">Close Chat</div> : <img  src={Chatimg} alt=""></img>}
        </button>
      )}
    </div>
  );
}

export default Chat;
