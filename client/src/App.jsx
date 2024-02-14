import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import LeftMessage from "./components/LeftMessage";
import RightMessage from "./components/RightMessage";

function App() {
  const [messages, setMessages] = useState([
    {
      sender:"micky",
      timestamp: new Date().getDate(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const handleSend = (e) => {
    e.preventDefault();
    console.log("Sending the message", inputMessage);
    setInputMessage("");
  };
  return (
    <div className="app__wrapper m-4">
      <Navbar />
      <div className="main  min-h-[39rem] mt-3 flex justify-center align-middle">
        <div className="messaging__container w-[34rem] bg-cyan-300 min-h-[39rem]">
          <div className="messages bg-white min-h-[35rem] p-4">
            <LeftMessage message={"hello"} />
            <RightMessage message={"hi"}/>
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
