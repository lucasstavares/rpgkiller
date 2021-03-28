import React from "react";
import "../css/previoustables.css";
import TableCard from "./TableCard";

export default function PreviousTables() {
  return (
    <div className="prev-tables">
      <header>Últimas mesas</header>
      <div>
        <TableCard></TableCard>
      </div>
    </div>
  );
}
