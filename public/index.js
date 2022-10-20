import Stats from "three/addons/libs/stats.module.js";

const wsLatencyPanel = new Stats.Panel("WS latency", "#0f0", "#020");
const workerLatencyPanel = new Stats.Panel("Worker latency", "#0f0", "#020");

const ws = new WebSocket(`ws://${location.host}`);
const worker = new Worker("./worker.js");

let wsPeakLatency = 0;
let workerPeakLatency = 0;

// let wsLatency = NaN;

const container = document.getElementById("test-stats");

container.append(wsLatencyPanel.dom);
container.append(workerLatencyPanel.dom);

ws.addEventListener("message", ({ data }) => {
  const time = parseInt(data);
  const latency = Date.now() - time;

  if (latency > wsPeakLatency) wsPeakLatency = latency;

  wsLatencyPanel.update(latency, wsPeakLatency);
});

worker.addEventListener("message", ({ data }) => {
  const time = parseInt(data);
  const latency = Date.now() - time;

  if (latency > workerPeakLatency) workerPeakLatency = latency;

  workerLatencyPanel.update(latency, workerPeakLatency);
});
