const fs = require("fs").promises;

async function datData(fileName) {
  const data = await fs.readFile(`./${fileName}.json`, "utf8");
  return data;
}

async function getHTML(fileName) {
  const html = await fs.readFile(`./${fileName}.html`, "utf8");
  return html;
}

const express = require("express");
const server = express();

server.get("/", (req, res) => {
  getHTML("index")
    .then((data) => res.send(data))
    .catch((e) => res.send("404"));
});

server.get("/api", (req, res) => {
  datData("data")
    .then((data) => {
      res.set("Content-Type", "application/json");
      res.set("Access-Control-Allow-Origin", "*");
      res.send(data);
    })
    .catch((e) => res.send("404"));
});

server.listen(3000, () => {
  console.log("Server is started!");
});