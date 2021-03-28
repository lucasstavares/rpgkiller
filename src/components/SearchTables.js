import React, { useEffect, useState } from "react";
import { listTables, joinTable } from "./requests";
import Sidebar from "./Sidebar";
import { useHistory } from "react-router";
import "../css/searchtable.css";
import lock from "../assets/lock.svg";
import scroll from "../assets/scroll.svg";

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
        setTables(res.data.slice(0, 9));
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="search-table-wrapper">
      <Sidebar />
      <div className="search-table-form-wrapper">
        <div className="search-table-form">
          <h1 className="label-search-table">Procurar Mesas</h1>
          <input
            className="input-search-table"
            placeholder="Digite o nome de uma mesa"
          ></input>
          <button className="button-search-table">Procurar</button>
        </div>
        <div className="table-card">
          {tables.length > 0 &&
            tables.map((table) => {
              return (
                <div
                  onClick={() => handleOnClick(table.id_table, table.pass)}
                  className="table-content-wrapper"
                  key={table.id_table}
                >
                  <div className="table-content">
                    <div className="img-background">
                      <img className="table-img" src={scroll} />
                    </div>
                    <div className="status">
                      {table.pass && (
                        <div className="locked">
                          <img className="lock-icon" src={lock} />
                          <p>requer senha</p>
                        </div>
                      )}
                      {JSON.parse(table.vagas) && (
                        <div className="vagas">Há vagas</div>
                      )}
                      {JSON.parse(table.adulto) && (
                        <div className="adulto">Conteúdo Adulto</div>
                      )}
                    </div>
                    <div>
                      <h1>{table.nome}</h1>
                      <p>{table.descricao}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
