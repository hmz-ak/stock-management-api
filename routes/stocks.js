var express = require("express");
var router = express.Router();
var { Stock } = require("../model/Stock");
var validateStock = require("../middleware/validateStock");

router.get("/", async (req, res) => {});

router.post("/", validateStock, async (req, res) => {
  let stock = new Stock();
  stock.name = req.body.name;
  stock.costPrice = req.body.costPrice;
  stock.salePrice = req.body.salePrice;
  stock.category = req.body.category;
  stock.stockQuantity = req.body.stockQuantity;
  stock.itemCode = req.body.itemCode;
  await stock.save();
  res.send(stock);
});

module.exports = router;
