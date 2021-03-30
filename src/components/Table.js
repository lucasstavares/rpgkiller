import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar.js";
import PlayersSidebar from "./players-sidebar/App";
import SendIcon from "../assets/right-arrow.svg";
import DiceIcon from "../assets/dice.svg";
import "../css/table.css";
import socket from "../socket.js";

function Table(props) {
  console.log("entrei");

  const dummy = useRef();
  const [messages, setMessages] = useState("");
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log("useffect1");
    /*ao inves de once é melhor usar off,
     o once apaga apos o uso mas n limita 
     qnts listeners podem ser registrados
     já o off apaga o anterior, então tá 
     safe*/
    socket.off("msg");
    socket.on("msg", (msg) => {
      const aux = [...messages, <p key={Math.random()}>{msg.msg}</p>];
      setMessages(aux);
      dummy.current.scrollIntoView({ behavior: "smooth" });
    });
  }, [messages]);

  useEffect(() => {
    console.log("useffect2");
    socket.connect();
    socket.once("connect", () => {
      socket.emit(
        "start",
        {
          token: sessionStorage.token,
          table_id: props.match.params.id,
        },
        (response) => {
          console.log(response);
          let arrayMsg = [];
          arrayMsg = response.msgs.map((msg) => {
            return <p key={Math.random()}>{msg.msg}</p>;
          });
          console.log(arrayMsg);
          setMessages(arrayMsg);
          dummy.current.scrollIntoView();
        }
      );
    });
  }, []);

  const send = (e) => {
    console.log(e);
    e.preventDefault();
    socket.emit("msg", { msg: input }, (response) => {
      console.log(response);
      e.target.elements.formInput.value = "";
    });
  };

  const roll = () => {
    socket.emit("roll", { dice: 6 }, (response) => {
      console.log(response);
    });
  };

  return (
    <div className="all-wrapper">
      <Sidebar />
      <div className="chat-container">
        <div id="chat-content" className="chat-content">
          {messages}
          <div ref={dummy}></div>
        </div>

        <form onSubmit={send} className="input-container">
          <input
            className="message-input"
            value={input}
            name="formInput"
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

        <div className="roll-container" onClick={roll}>
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
