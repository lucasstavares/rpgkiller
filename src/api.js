const axios = require("axios");

const instance = axios.create({
  baseURL: "http://189.91.233.48:3000",
});

export default instance;
