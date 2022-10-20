"use strict";
const serverListening = require("./server");
const { BrowserWindow, app } = require("electron");

const unlockFPS = process.argv.includes("--unlock-fps");

if (unlockFPS) app.commandLine.appendSwitch("disable-frame-rate-limit");

app.once("ready", () => {
  const win = new BrowserWindow({
    show: false,
    // resizable: false,
    width: 720,
    height: 720,
    title: `Demo (${unlockFPS ? "FPS unlocked" : " FPS locked"})`,
  });

  win.webContents.openDevTools({ mode: "undocked" });

  win.once("ready-to-show", () => win.show());

  serverListening.then(() => win.loadURL("http://localhost:8080"));
});
