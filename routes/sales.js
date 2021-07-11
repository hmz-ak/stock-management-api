var express = require("express");
var router = express.Router();
var { Sale } = require("../model/saleReport");
var { Stock } = require("../model/Stock");

router.get("/", async (req, res) => {});

router.post("/", async (req, res) => {
  let sale = new Sale({ customerName: req.body.name, data: req.body.data });

  for (let i = 0; i < sale.data.length; i++) {
    let dat = await Stock.findById(sale.data[i].id);
    dat.stockQuantity = dat.stockQuantity - sale.data[i].quantity;
    await dat.save();
  }
  await sale.save();
  res.send(sale);
});

module.exports = router;
