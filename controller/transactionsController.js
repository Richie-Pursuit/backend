const express = require("express");
const transaction = express.Router();
const transactionArr = require("../models/transaction");
const uuid = require('uuid')

const validateURL = (req, res, next) => {
    console.log("This function runs on the POST log");
    next();
  };


transaction.use((req, res, next) => {
    console.log("This function checks the validity of the POST entered by the user");
    next();
  });

// / GET ROUTE FOR/ SHOW ALL BOOKMARKS
transaction.get("/", (req, res) => {
  res.status(200).json(transactionArr);
});
// SHOW ROUTE SHOW ONE TRANSACTION BASED ON INDEX
transaction.get("/:index", (req, res) => {
    const { index } = req.params;
    if (transactionArr[index]) {
      res.status(200).json(transactionArr[index]);
    } else {
      res.redirect("/*");
    }
  });

// logs endpoint for POST
// transaction.post("/", validateURL, (req, res) => {
//     const id=uuid.v4()
//     const newBody = { id, ...req.body }
//     transactionArr.push(newBody);

//   });

// new transctn
transaction.post("/", validateURL, (req, res) => {
    transactionArr.push(req.body);
    res.json([transactionArr.length -1]);
  });


  // update
  transaction.put("/:id", validateURL, (req, res) => {
    if (transactionArr[req.params.id]) {
      transactionArr[req.params.id] = req.body;
      res.status(200).json(transactionArr[req.params.id]);
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  });

    // DELETE
    transaction.delete("/:id", (req, res) => {
    transactionArr.pop(req.body);
    res.json(transactionArr.at(0));
    });

module.exports = transaction;