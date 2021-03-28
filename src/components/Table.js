import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar.js";
import PlayersSidebar from "./players-sidebar/App";
import SendIcon from "../assets/right-arrow.svg";
import DiceIcon from "../assets/dice.svg";
import "../css/table.css";
import socket from "../socket.js";

function Table(props) {
  const dummy = useRef();
  const [messages, setMessages] = useState(["hola?"]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.once("msg", (msg) => {
      const aux = [...messages, msg];
      setMessages(aux);
      renderNewMessage(msg.msg);
    });
    socket.once("roll", (msg) => {
      const aux = [...messages, msg];
      setMessages(aux);
      renderNewMessage(msg.msg);
    });
  }, [messages]);

  useEffect(() => {
    socket.emit(
      "start",
      {
        token: sessionStorage.token,
        table_id: props.match.params.id,
      },
      (response) => {
        console.log(response);
        setMessages(response.msgs);
       // response.msgs.forEach((msg) => {
        //  renderNewMessage(msg.msg);
       // });
        //dummy.current.scrollIntoView({ behavior: "smooth" });
      }
    );
  }, []);

  const send = (e) => {
    e.preventDefault();
    socket.emit("msg", { msg: input }, (response) => {
      console.log(response);
    });
  };

  const roll = () => {
    socket.emit("roll", { dice: 6 }, (response) => {
      console.log(response);
    });
  };

  const renderNewMessage = (msg) => {
    const newMsg = document.createElement("p");
    newMsg.innerText = msg;
    const chatEl = document.getElementById("chat-content");
    chatEl.appendChild(newMsg);
    newMsg.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="all-wrapper">
      <Sidebar />
      <div className="chat-container">
        <div id="chat-content" className="chat-content">
          {/*messages.length > 0 &&
            messages.map((msg) => {
              return <div key={Math.random()}>{msg.msg}</div>;
            })*/}
          <div ref={dummy}></div>
        </div>

        <form onSubmit={send} className="input-container">
          <input
            className="message-input"
            value={input}
            type="text"
            placeholder="pf funciona programa"
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            style={{ backgroundColor: "#00000000", border: "none" }}
            type="submit"
          >
            <img alt="send" className="send-icon" src={SendIcon} />
          </button>
        </form>

        <div className="roll-container" onClick={renderNewMessage}>
          <img className="dice-icon" src={DiceIcon} alt="dice" />
          <img className="dice-icon" src={DiceIcon} alt="dice" />
          <img className="dice-icon" src={DiceIcon} alt="dice" />
          <img className="dice-icon" src={DiceIcon} alt="dice" />
          <img className="dice-icon" src={DiceIcon} alt="dice" />
          <img className="dice-icon" src={DiceIcon} alt="dice" />
        </div>
      </div>
      <div className="players-container">
        <PlayersSidebar />
      </div>
    </div>
  );
}

export default Table;
