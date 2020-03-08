import { v4 as uuidv4 } from "uuid";
import clientIo from "socket.io-client";

export function createUniqueIdInPool(pool) {
  let id = uuidv4();
  if (pool[id]) {
    return createUniqueIdInPool(pool);
  }
  return id;
}
export function Connection(url = "") {
  this.id = "";
  this.url = url;
  this.socket = null;
  this.events = [];
}

export function tryToSubscribe(connection, successCb, eventCb, disconnectCb) {
  const { url } = connection;
  const socket = clientIo(url);
  connection.socket = socket;
  socket.on("connect", () => successCb(connection));
  socket.on("event", () => eventCb(connection));
  socket.on("disconnect", () => disconnectCb(connection));
  return connection;
}
