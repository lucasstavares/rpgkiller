const axios = require("axios");

const instance = axios.create({
  baseURL: "http://189.91.235.101:3000",
});

export default instance;