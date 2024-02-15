import { useEffect, useRef, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LeftMessage from "./components/LeftMessage";
import RightMessage from "./components/RightMessage";

function App() {
  const user  = "micky";
  const [messages, setMessages] = useState([
    {
      sender:"micky",
      timestamp: new Date().toLocaleTimeString(),
      message: "micky saying hi micky saying hi micky saying hi micky saying hi micky saying hi micky saying hi ",
    },
    
    {
      sender:"not micky",
      timestamp: new Date().toLocaleTimeString(),
      message: "not micky saying hi, micky saying hi micky saying hi micky saying hi micky saying hi micky saying hi micky saying hi micky saying hi micky saying hi ",
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const handleSend = (e) => {
    const newMessage = {
      sender: user,
      message: inputMessage,
      timestamp: new Date().toLocaleDateString()
    };
  
    setMessages(prevMessages => [...prevMessages, newMessage]);
    e.preventDefault();
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
      <div className="main min-h-[39rem] mt-3 flex justify-center align-middle">
        <div className="messaging__container w-[34rem] bg-cyan-300 min-h-[39rem]">

          <div className="messages flex flex-col bg-white min-h-[35rem] max-h-[35rem] p-4 overflow-y-scroll">
            {messages && messages.map((messageItem, index)=>{
              if(messageItem.sender === user){
                return <RightMessage  key={index} messageItem={messageItem}/>
              }
              else{
                return <LeftMessage messageItem={messageItem} key={index}/>
              }
            })}
            <div ref={messagesEndRef} />
          </div>
          <form
            action="submit"
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
              onClick={handleSend}
              onSubmit={handleSend}
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
