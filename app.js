const express = require("express");
const app = express();
const morgan = require("morgan");
// const bookmarks = require("./controllers/transactionsController");
const transactionsController = require("./controller/transactionsController");
const cors =require('cors')

app.use((req, res, next) => {
  console.log("This code runs for every request");
  next();
});

app.use(express.json());
app.use(cors())
app.use(morgan("tiny"));
app.use("/transactions", transactionsController);

app.get("/", (req, res) => {
  res.send("Welcome to the Budget App");
});

app.get("*", (req, res) => {
  res.status(404).json({ error: "Page not found" });
});

module.exports = app;
