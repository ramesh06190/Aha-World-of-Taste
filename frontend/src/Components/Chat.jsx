import React, { useState, useRef, useEffect } from 'react';
import './Chat.css'; // Import your CSS file

function Chat() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const chatMessageParentRef = useRef(null);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const sendMessage = () => {
        if (message.trim() === '') return;
        const userMessage = { text: message, sender: 'user' };
        setMessages([...messages, userMessage]);
        setMessage('');

        // Simulate a random reply from another user
        setTimeout(() => {
            const randomReply = getRandomReply();
            const otherMessage = { text: randomReply, sender: 'other' };
            setMessages([...messages, userMessage, otherMessage]);
        }, 1000);
    };

    // Function to generate a random reply from another user
    const getRandomReply = () => {
        const replies = [
            "Hello, foodie! Ready to explore our delicious menu?",
            "Hello! How can I assist you today?",
            "I'm here to help with any questions you have.",
            "I appreciate your patience while I look up that information.",
            "I appreciate your input. It's valuable to me.",
            "Thank you for chatting with us! We look forward to serving you soon."
        ];
        const randomIndex = Math.floor(Math.random() * replies.length);
        return replies[randomIndex];
    };

    // Use useEffect to scroll to the bottom when messages change
    useEffect(() => {
        if (chatMessageParentRef.current) {
            chatMessageParentRef.current.scrollTop = chatMessageParentRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className="chat-container">
            <div className={`chat ${isChatOpen ? 'open' : 'closed'}`}>
                <div className="chat-header" onClick={toggleChat}>
                    Chat
                </div>
                <div className="chat-message-parent" ref={chatMessageParentRef}>
                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message ${msg.sender === 'user' ? 'user' : 'other'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                </div>
                {isChatOpen && (
                    <div className="chat-input">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                )}
            </div>
            <button className="toggle-chat" onClick={toggleChat}>
                {isChatOpen ? 'Close Chat' : 'Open Chat'}
            </button>
        </div>
    );
}

export default Chat;
