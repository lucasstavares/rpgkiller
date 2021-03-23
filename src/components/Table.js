import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import "../css/table.css";
import socket from "../socket.js";

function Table(props) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const id = props.match.params.id;

  useEffect(() => {
    function connect() {
      socket.emit(
        "start",
        {
          token: sessionStorage.token,
          table_id: id,
        },
        (response) => {
          console.log(response);
          let counter = 0;
          socket.on("msg", (data) => {
            const arrayMsg = messages;
            arrayMsg.push({
              text: data.msg,
              owner: data.username,
              id: counter,
            });
            counter++;
            console.log(arrayMsg);
            setMessages(arrayMsg);
          });
        }
      );
    }
    connect();
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit(
      "msg",
      {
        msg: input,
      },
      (response) => {
        console.log(response);
      }
    );
  };

  return (
    <div className="all-wrapper">
      <Sidebar></Sidebar>
      <div className="chat-wrapper">
        <div className="chatbox">
          {messages.length > 0 &&
            messages.map((message) => {
              console.log(message);
              return (
                <div key={message.id} style={{ color: "white" }}>
                  {message.text} by {message.owner}
                </div>
              );
            })}
        </div>
        <div className="table-form-wrapper">
          <form onSubmit={onSubmit}>
            <input
              placeholder="Mande uma mensagem!"
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <button type="submit">submit</button>
          </form>
        </div>
        <div className="fav-dices"></div>
      </div>
    </div>
  );
}

export default withRouter(Table);
