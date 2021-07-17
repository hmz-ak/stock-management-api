var express = require("express");
var router = express.Router();
var { Stock } = require("../model/Stock");
var validateStock = require("../middleware/validateStock");

router.get("/", async (req, res) => {
  let stock = await Stock.find();
  res.send(stock);
});

router.get("/:id", async (req, res) => {
  let stock = await Stock.findById({ _id: req.params.id });
  res.send(stock);
});

router.put("/:id", async (req, res) => {
  let stock = await Stock.findById(req.params.id);
  stock.name = req.body.name;
  stock.costPrice = req.body.costPrice;
  stock.salePrice = req.body.salePrice;
  stock.rackNumber = req.body.rackNumber;
  stock.category = req.body.category;
  stock.stockQuantity = req.body.stockQuantity;
  stock.itemCode = req.body.itemCode;
  await stock.save();

  res.send(stock);
});

router.post("/", validateStock, async (req, res) => {
  let stock = new Stock();
  stock.name = req.body.name;
  stock.costPrice = req.body.costPrice;
  stock.salePrice = req.body.salePrice;
  stock.rackNumber = req.body.rackNumber;
  stock.category = req.body.category;
  stock.stockQuantity = req.body.stockQuantity;
  stock.itemCode = req.body.itemCode;
  await stock.save();
  res.send(stock);
});

router.delete("/:id", async (req, res) => {
  var stock = await Stock.findById(req.params.id);
  await stock.remove();
  res.send(stock);
});

router.delete("/del", async (req, res) => {
  await Stock.remove({});
  res.send("done");
});
module.exports = router;
