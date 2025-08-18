import React, { useState, useRef, useEffect } from "react";

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const messagesEndRef = useRef(null);

  const userId = localStorage.getItem("userId");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessageFromOption = (option) => {
    setInput(option);
    sendMessage(option);
  };

  const sendMessage = async (customInput) => {
    const messageToSend = customInput || input;
    if (!messageToSend.trim()) return;

    const newMessages = [...messages, { sender: "user", text: messageToSend }];
    setMessages(newMessages);

    try {
      const res = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          message: messageToSend,
        }),
      });

      const data = await res.json();

      let sender = "bot";
      if (data.reply.includes("Rohan")) sender = "Rohan";
      else if (data.reply.includes("Shakti")) sender = "Shakti";

      setMessages([
        ...newMessages,
        { sender, text: data.reply, options: data.options || null },
      ]);
    } catch (error) {
      console.error("Error:", error);
    }

    setInput("");
  };


  return (
    <>
      {/* Floating button */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          right: "40px",
          backgroundColor: "#052b3d",
          color: "white",
          borderRadius: "50%",
          width: "70px",
          height: "70px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        💬
      </div>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "300px",
            maxHeight: "400px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: "#052b3d",
              color: "white",
              padding: "10px",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
              fontWeight: "bold",
            }}
          >
            KStudios Assistant
          </div>

          {/* Messages container */}
          <div
            style={{
              flex: 1,
              padding: "10px",
              overflowY: "auto",
              maxHeight: "calc(400px - 50px - 50px)",
            }}
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                style={{
                  textAlign: msg.sender === "user" ? "right" : "left",
                  margin: "5px 0",
                }}
              >
                <span
                  style={{
                    background:
                      msg.sender === "user"
                        ? "#007bff"
                        : msg.sender === "Rohan"
                        ? "#87CEFA"
                        : msg.sender === "Shakti"
                        ? "#ffb6c1"
                        : "#e4e6eb",
                    color: msg.sender === "user" ? "white" : "black",
                    padding: "8px 12px",
                    borderRadius: "15px",
                    display: "inline-block",
                    maxWidth: "80%",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text}
                </span>

                {/* 🔹 If options exist, show them as buttons */}
                {msg.options && (
                  <div style={{ marginTop: "5px" }}>
                    {msg.options.map((opt, idx) => (
                      <button
                        key={idx}
                        style={{
                          backgroundColor: "#f1f1f1",
                          border: "1px solid #ccc",
                          borderRadius: "15px",
                          padding: "5px 10px",
                          marginRight: "5px",
                          cursor: "pointer",
                        }}
                        onClick={() => sendMessageFromOption(opt)}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div style={{ display: "flex", borderTop: "1px solid #ccc" }}>
            <input
              style={{
                flex: 1,
                padding: "8px",
                border: "none",
                outline: "none",
              }}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              style={{
                backgroundColor: "#052b3d",
                color: "white",
                border: "none",
                padding: "8px 12px",
                cursor: "pointer",
              }}
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      )}

      {/* Mobile styling */}
      <style>
        {`
          @media (max-width: 500px) {
            div[style*="position: fixed"][style*="bottom: 90px"] {
              width: 90%;
              right: 5%;
              max-height: 60%;
            }
          }
        `}
      </style>
    </>
  );
};

export default FloatingChatbot;
