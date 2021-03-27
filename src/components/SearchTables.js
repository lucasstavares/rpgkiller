import React, { useEffect, useState } from "react";
import { listTables, joinTable } from "./requests";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router";
import "../css/searchtable.css";

export default function SearchTables() {
  const [tables, setTables] = useState([]);
  const history = useHistory();

  function handleOnClick(id, pass) {
    console.log(id, pass);
    joinTable(id, pass)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          history.push("/table/" + id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    listTables()
      .then((res) => {
        console.log(res);
        setTables(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="search-table-wrapper">
      <Sidebar />
      <div className="search-table-form" styles={{ display: "flex" }}>
        <h1 className="label-search-table">Procurar Mesas</h1>
        <input
          className="input-search-table"
          placeholder="Digite o nome de uma mesa"
        ></input>
        <button className="button-search-table">Procurar</button>
        {tables.length > 0 &&
          tables.map((table) => {
            return (
              <div
                key={table.id_table}
                onClick={() => handleOnClick(table.id_table, table.pass)}
              >
                {table.nome}
              </div>
            );
          })}
      </div>
    </div>
  );
}
