const fs = require("fs").promises;

const express = require("express");
const server = express();

const products = [
  { id: 1, name: "meat", price: 12.3, count: 12 },
  { id: 2, name: "milk", price: 3.0, count: 4 },
  { id: 3, name: "apple", price: 1.0, count: 33 },
  { id: 4, name: "orange", price: 2.0, count: 23 },
  { id: 5, name: "book", price: 10.0, count: 12 },
  { id: 6, name: "pen", price: 0.3, count: 212 },
  { id: 7, name: "nut", price: 6.0, count: 32 },
  { id: 8, name: "melon", price: 2.0, count: 56 },
  { id: 9, name: "bag", price: 22.0, count: 6 },
  { id: 10, name: "water", price: 0.5, count: 12 },
];

server.get("/products", function (req, res) {
  const count = parseInt(req.query.count);
  const offset = parseInt(req.query.offset);
  if (count && offset) {
    res.send({
      products: products.slice(offset, offset + count),
      count: products.length,
    });
  } else {
    res.json(products);
  }
});

server.get("/products/:id", function (req, res) {
  const product = products.find(
    (product) => product.id === Number(req.params.id)
  );
  if (!product) {
    res.status(404).send("404 NOT FOUND");
  }
  res.status(200).json(product);
});

server.listen(3000, () => {
  console.log("Server is started!");
});