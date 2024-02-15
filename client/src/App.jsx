import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LeftMessage from "./components/LeftMessage";
import RightMessage from "./components/RightMessage";
import baseURL from "./baseURL";
import { io } from "socket.io-client";
const socket = io(baseURL);

function App() {
  const [showUserNameInput, setUserNameInput] = useState(true);
  const [user, setUser] = useState("");
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    if (username) {
      setUserNameInput((prev)=>{!prev})
      socket.emit("user-connected", username);
    }
    return;
  }, [username]);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message.sender, "sent", message.message);
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("message", () => {
        console.log("Message event removed')");
      });
    };
  }, [socket]);

  const handleNameSubmit = (e) => {
    e.preventDefault();
    setUsername(user);
  };

  const handleSend = (e) => {
    e.preventDefault();
    if(!username){
      alert('Please enter a username')
      return;
    }
    const newMessage = {
      sender: username,
      message: inputMessage,
      timestamp: new Date().toLocaleDateString(),
    };

    socket.emit("message", newMessage);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
    console.log("Sending the message", inputMessage);
    setInputMessage("");
    console.log(messages);
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="app__wrapper m-4">
      <Navbar />
      {showUserNameInput && <div className="username__container flex justify-center">
        <form onSubmit={handleNameSubmit}>
          <input
            type="text"
            placeholder="Enter your name"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-[26rem] p-3 rounded-lg outline-none"
          />
          <button
            type="submit"
            className="bg-[#6468f6] w-[6rem] text-white font-bold rounded-lg p-2"
          >
            Submit
          </button>
        </form>
      </div>}
      <div className="main min-h-[39rem] mt-3 flex justify-center align-middle">
        <div className="messaging__container w-[34rem] bg-cyan-300 min-h-[39rem]">
          <div className="messages flex flex-col bg-white min-h-[35rem] max-h-[35rem] p-4 overflow-y-scroll">
            {messages.map((messageItem, index) =>
              messageItem.sender === user ? (
                <RightMessage key={index} messageItem={messageItem} />
              ) : (
                <LeftMessage key={index} messageItem={messageItem} />
              )
            )}
            <div ref={messagesEndRef}></div>
          </div>
          <form
            onSubmit={handleSend}
            className="bg-[#f0f0fe] p-4 flex justify-between"
          >
            <input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              type="text"
              placeholder="Text Message..."
              className="w-[26rem] p-3 rounded-lg outline-none"
            />
            <button
              type="submit"
              className="bg-[#6468f6] w-[5rem] text-white font-bold rounded-lg"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
