import cors from "cors";
import express from "express";
import { setTimeout } from "timers/promises";

const sab = new SharedArrayBuffer(4);
const lock = new Int32Array(sab);

const syncApp = new express();

syncApp.use(cors());

syncApp.get("/", async (req, res) => {
  // causes eventloop to wait
  Atomics.wait(lock, 0, 0, 100);
  res.send("Hello sync wait World!");
});

syncApp.listen("3000", () =>
  console.log("single thread sync wait app listening on port 3000!")
);

const asyncApp = new express();

asyncApp.use(cors());

asyncApp.get("/", async (req, res) => {
  // causes promise to wait
  await setTimeout(100);
  res.send("Hello async wait World! (single thread)");
});

asyncApp.listen("5000", () =>
  console.log("single thread async wait app listening on port 5000!")
);

//

import path from "path";
import { fileURLToPath } from "url";
import { resolve } from "path";
import Piscina from "piscina";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const piscinaAsyncWait = new Piscina({
  filename: resolve(__dirname, "async-sleep-worker.js"),
});

const piscinaSyncWait = new Piscina({
  filename: resolve(__dirname, "sync-sleep-worker.js"),
});

const syncAppPooled = new express();

syncAppPooled.use(cors());

syncAppPooled.get("/", async (req, res) => {
  // causes eventloop to wait
  const resp = await piscinaSyncWait.run();
  res.send(resp);
});

syncAppPooled.listen("3001", () =>
  console.log("multi thread sync wait app listening on port 3001!")
);

const asyncAppPooled = new express();

asyncAppPooled.use(cors());

asyncAppPooled.get("/", async (req, res) => {
  // causes promise to wait
  const resp = await piscinaAsyncWait.run();
  res.send(resp);
});

asyncAppPooled.listen("5001", () =>
  console.log("multi thread async wait app listening on port 5001!")
);
