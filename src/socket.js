import { io } from "socket.io-client";

const URL = "189.91.235.101:3001";
const socket = io(URL, { autoConnect: true });

export default socket;