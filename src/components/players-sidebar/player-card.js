import React, { useEffect, useState } from "react";
import { Line } from "rc-progress";
import plus from "./plus.svg";
import "./player-card.css";
import { CirclePicker } from "react-color";

export default function PlayerCard({ name, role }) {
  const [playerBars, setPlayersBars] = useState([]);
  const [input, setInput] = useState("");
  const [newBarInput, setNewBarInput] = useState("");

  useEffect(() => {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    }
  }, []);

  const newBar = (e) => {
    e.preventDefault();
    console.log(newBarInput);
    setPlayersBars([...playerBars, { barName: newBarInput }]);
    setNewBarInput("");
  };

  return (
    <div className="player-card">
      <div className="top">
        <div className="player-img-container">
          <img />
        </div>
        <div className="player-info-container">
          <p className="player-name">{name}</p>
          <p className="player-role">{role}</p>
          <textarea
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={"bar-input"}
            placeholder="player-stats"
          />
        </div>
      </div>
      <div className="bottom">
        {playerBars.length > 0 &&
          playerBars.map((bar) => {
            return <Bar name={bar.barName} />;
          })}
        <form className="new-bar-form" onSubmit={newBar}>
          <input
            value={newBarInput}
            type="text"
            onChange={(e) => setNewBarInput(e.target.value)}
          />
          <button className="bars-button" type="submit">
            <img style={{ width: "15px", height: "15px" }} src={plus} />
          </button>
        </form>
      </div>
    </div>
  );
}

const Bar = ({ name }) => {
  const [atualInput, setAtualInpupt] = useState(100);
  const [classname, setClassname] = useState("bar-form active");
  const [maxInput, setMaxInput] = useState(100);
  const percent = (atualInput / maxInput) * 100;

  const toogle = () => {
    if (classname === "bar-form") setClassname("bar-form active");
    else setClassname("bar-form");
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        toogle();
      }}
    >
      <div className={classname}>
        <input
          onChange={(e) => setAtualInpupt(e.target.value)}
          value={atualInput}
        />
        <span>/</span>
        <input onChange={(e) => setMaxInput(e.target.value)} value={maxInput} />
      </div>
      <Progress percent={percent} toogle={toogle} name={name} />
      <button type="submit" hidden />
    </form>
  );
};

const Progress = ({ percent, toogle, name }) => {
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [color, setColor] = useState("#2DB7F5");

  const handleChange = (e) => {
    setColor(e.hex);
  };

  return (
    <div className="bar-line-container">
      <p>{name}</p>
      <Line
        style={{ height: "10px", width: "90%", margin: "5px 0" }}
        percent={percent}
        onClick={toogle}
        trailColor="white"
        strokeColor={color}
      />
      <div
        style={{ backgroundColor: color }}
        className="color-picker-button"
        onClick={() => setShowColorPicker(showColorPicker ? false : true)}
      >
        {showColorPicker && <CirclePicker onChange={handleChange} />}
      </div>
    </div>
  );
};
