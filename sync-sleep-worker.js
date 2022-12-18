"use strict";

const sab = new SharedArrayBuffer(4);
const lock = new Int32Array(sab);

export default async () => {
  // causes thread to wait
  Atomics.wait(lock, 0, 0, 100);
  return "Hello sync worker wait World!";
};
