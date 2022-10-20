"use strict";
const express = require("express");
const { WebSocketServer } = require("ws");
const { createServer } = require("http");
const { join } = require("path");

const app = express();

app.use(express.static(join(__dirname, "..", "public")));

const wss = new WebSocketServer({ noServer: true });

wss.on("connection", (socket) => {
  const interval = setInterval(() => {
    socket.send(Date.now().toString());
  }, 10);

  socket.once("close", () => {
    clearInterval(interval);
  });
});

const server = createServer();

server.on("listening", () => {
  const address = server.address();

  console.log(
    `Server listening on http://${
      address.family === "IPv6" ? `[${address.address}]` : address.address
    }:${address.port}`
  );
});

server.on("request", (req, res) => app(req, res));

server.on("upgrade", (req, socket, head) =>
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit("connection", ws, req))
);

server.listen({
  port: 8080,
});
