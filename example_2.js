"use strict";

const fs = require("fs");

async function a() {
  console.log("a");
}

async function main() {
  //
  fs.readFile("./a.txt", "utf8", (err, data) => {
    if (err) throw err;
    console.log("Callback", data);
  });
  //
  const fsPromise = new Promise(function (resolve, reject) {
    fs.readFile("./a.txt", "utf8", (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
  //
  a();
  //
  fsPromise.then((data) => {
    console.log("Promise", data);
  });
  //
  const AwaitData = await fsPromise;
  console.log("AwaitData", AwaitData);
  //
  const data = fs.readFileSync("./a.txt", "utf8");
  console.log("Sync", data);
  //
}

main();
