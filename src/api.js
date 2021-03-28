const axios = require("axios");

const instance = axios.create({
  baseURL: "http://189.91.233.78:3000",
});

export default instance;