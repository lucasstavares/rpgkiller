import axios from "../api";

function listTables() {
  return new Promise((resolve, reject) => {
    axios
      .get("/list_tables", {
        params: {
          token: sessionStorage.token,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

function joinTable(id, pass) {
  return new Promise((resolve, reject) => {
    axios
      .get("/join", {
        params: {
          token: sessionStorage.token,
          table_id: id,
          pass: pass,
        },
      })
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => reject(err));
  });
}

export { listTables, joinTable };
