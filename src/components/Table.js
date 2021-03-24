import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import "../css/table.css";
import socket from "../socket.js";

function Table(props) {
  const [messages, setMessages] = useState(["hola?"]);
  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(messages);
    socket.once("msg", (msg) => {
      setMessages([...messages, msg]);
    });
    socket.once("roll", (msg) => {
      setMessages([...messages, msg]);
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
        setMessages(response);
      }
    );
  }, []);

  const send = () => {
    socket.emit("msg", { msg: input }, (response) => {
      console.log(response);
    });
  };

  const roll = () => {
    socket.emit("roll", { dice: 6 }, (response) => {
      console.log(response);
    });
  };

  return (
    <div
      className="all-wrapper"
      style={{ display: "flex", flexDirection: "column", color: "white" }}
    >
      {messages.length > 0 &&
        messages.map((msg) => {
          return <div>{msg.msg}</div>;
        })}
      <input
        value={input}
        type="text"
        placeholder="pf funciona programa"
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={send}>click</button>
      <button onClick={roll}>roll</button>
    </div>
  );
}

export default Table;
