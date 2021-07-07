var express = require("express");
var router = express.Router();
var { Sale } = require("../model/saleReport");
var validateSale = require("../middleware/validateSale");

router.get("/", async (req, res) => {});

router.post("/", validateSale, async (req, res) => {
  let sale = new Sale();
  sale.name = req.body.name;
  sale.quantity = req.body.quantity;
  sale.itemCode = req.body.itemCode;
  if (sale.discount) {
    sale.discount = req.body.discount;
  }
  sale.amount = req.body.amount;
  await sale.save();
  res.send(sale);
});

module.exports = router;
