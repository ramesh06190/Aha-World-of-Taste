import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { TextField, Button, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ThemeProvider, createTheme } from "@mui/material";
import { get, post } from "../api/ApiService";
import io from "socket.io-client";
import { baseURL } from "../api/ApiService";

function AdminLanding() {
  const [value, setValue] = useState(0);
  const [adminMessage, setAdminMessage] = useState("");
  const [userMessages, setUserMessages] = useState([]);
  const [roomId, setRoomId] = useState("");
  const [user, setUser] = useState([]);
  const admin = true;
  const socket = useRef(io(baseURL));

  const handleJoinRoom = useCallback((roomId) => {
    socket.current.emit("join room", roomId);
  }, []);

  const handleSendMessage = useCallback(
    (message) => {
      socket.current.emit(
        "send message",
        roomId,
        message,
        admin ? "admin" : "user"
      );
    },
    [admin, roomId]
  );

  const handleNewMessage = useCallback((message) => {
    if (message) {
      setUserMessages((prev) => [...prev, message]);
    }
  }, []);

  useEffect(() => {
    socket.current.on("new message", handleNewMessage);

    return () => {
      socket.current.off("new message", handleNewMessage);
    };
  }, [handleNewMessage]);

  const handleChange = (event, newValue) => {
    const selectedUserId = user[newValue].id;
    setRoomId(selectedUserId);
    handleJoinRoom(selectedUserId);
    GetChat(selectedUserId);
    setValue(newValue);
  };

  const GetChat = async (id) => {
    const postData = {
      userId: id,
    };
    const result = await post("user/chat", postData);
    setUserMessages(result.data);
  };

  const updateSeen = useCallback(async () => {
    const postData = {
      id: roomId,
    };
    const result = await post("user/update/seen", postData);
    if (result.status) {
      getAllUser();
    }
  }, [roomId]);

  useEffect(() => {
    updateSeen();
  }, [roomId, updateSeen]);

  const handleAdminMessageChange = useCallback((event) => {
    setAdminMessage(event.target.value);
  }, []);

  const handleSendClick = useCallback(() => {
    handleSendMessage(adminMessage);
    setAdminMessage("");
  }, [adminMessage, handleSendMessage]);

  const theme = useTheme();
  const themeMUI = createTheme();
  const count = useMemo(
    () => Array.from({ length: 23 }, (_, index) => index + 1),
    []
  );

  const chatMessageParentRef = useRef(null);

  useEffect(() => {
    if (chatMessageParentRef.current) {
      chatMessageParentRef.current.scrollTop =
        chatMessageParentRef.current.scrollHeight;
    }
  }, [userMessages]);

  useEffect(() => {
    getAllUser();
  }, []);

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter") {
        if (adminMessage.length !== 0) {
          handleSendClick();
        }
      }
    },
    [handleSendClick]
  );

  const getAllUser = useCallback(async () => {
    const result = await get("user/all-user");
    let data = result.data;
    let filteredArray = data.filter((ele) => ele.chatMessages.length !== 0);
    GetChat(filteredArray[0].id);
    handleJoinRoom(filteredArray[0].id);
    setRoomId(filteredArray[0].id);
    setUser(filteredArray);
  }, [GetChat, handleJoinRoom]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    return `${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  }
  return (
    <div className="admin-chat-con">
      <ThemeProvider theme={themeMUI}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              {user.map((val, index) => (
                <Tab
                  key={val.id}
                  label={`${val.fullName}`}
                  style={{
                    color: val.seen ? "" : "black",
                    fontWeight: val.seen ? "" : "800",
                  }}
                />
              ))}
            </Tabs>
          </AppBar>
          <div className="chat-admin-area" ref={chatMessageParentRef}>
            {userMessages.map((message, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    message.sender === "admin" ? "flex-end" : "flex-start",
                  marginBottom: "8px",
                }}
              >
                <Paper
                  elevation={3}
                  style={{
                    padding: "8px",
                    margin: "5px 10px",
                    backgroundColor:
                      message.sender === "admin" ? "#EFD36D" : "#eee",
                    color: message.sender === "admin" ? "black" : "#333",
                    borderRadius:
                      message.sender === "admin"
                        ? "15px 15px 0 15px"
                        : "15px 15px 15px 0",
                  }}
                  className="admin-chats"
                >
                  {message.content}
                  <p className="message-timestamp">
                    {formatTimestamp(message.timestamp)}
                  </p>
                </Paper>
              </div>
            ))}
          </div>
          <div className="admin-input-area">
            <TextField
              label="Admin Message"
              fullWidth
              value={adminMessage}
              onKeyDown={handleKeyDown}
              onChange={handleAdminMessageChange}
            />
            <Button
              style={{
                marginTop: "13px",
                backgroundColor: "#EFD36D",
                color: "black",
              }}
              variant="contained"
              onClick={handleSendClick}
              fullWidth
              disabled={adminMessage.length == 0}
            >
              Send
            </Button>
          </div>
        </Box>
      </ThemeProvider>
    </div>
  );
}

export default AdminLanding;
