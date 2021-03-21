import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Sidebar from "./Sidebar.js";
import "../css/table.css";
import socket from "../socket.js";

function Table(props) {
  const [input, setInput] = useState("");
  const id = props.match.params.id;
  useEffect(() => {
    function connect() {
      socket.emit(
        "start",
        {
          token: sessionStorage.token,
          table_id: props.match.params.id,
        },
        (response) => {
          console.log(response);
        }
      );
    }
    connect();
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit(
      "msg",
      {
        token: sessionStorage.token,
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
        <div className="chatbox"></div>
        <div className="table-form-wrapper">
          <form onSubmit={onSubmit}>
            <input
              placeholder="Mande uma mensagem!"
              onChange={(e) => setInput(e.target.value)}
            ></input>
            <button type="submit"></button>
          </form>
        </div>
        <div className="fav-dices"></div>
      </div>
    </div>
  );
}

export default withRouter(Table);
