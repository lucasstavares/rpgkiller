import { io } from "socket.io-client";

const URL = "localhost:3001";
const socket = io(URL, { autoConnect: true });

export default socket;