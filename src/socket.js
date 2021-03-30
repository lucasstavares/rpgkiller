import { io } from "socket.io-client";

const URL = "189.91.233.48:3001";
const socket = io(URL, { autoConnect: false });

export default socket;
