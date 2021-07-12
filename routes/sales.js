var express = require("express");
var router = express.Router();
var { Sale } = require("../model/saleReport");
var { Stock } = require("../model/Stock");
router.get("/", async (req, res) => {
  let sales = await Sale.find().sort({ date: "desc" });
  // console.log(sales);
  res.send(sales);
});
router.post("/profit", async (req, res) => {
  // console.log(req.body);

  let sales = await Sale.find({
    date: {
      $gte: new Date(req.body.start).setHours(00, 00, 00),
      $lt: new Date(req.body.end).setHours(23, 59, 59),
    },
  });
  // console.log(sales);
  // console.log(sales);
  res.send(sales);
});
router.get("/:id", async (req, res) => {
  let sales = await Sale.findById(req.params.id);
  // console.log(sales);
  res.send(sales);
});

router.post("/", async (req, res) => {
  let sale = new Sale({
    customerName: req.body.name ? req.body.name : "unknown",
    costPriceTotal: req.body.costPriceTotal ? req.body.costPriceTotal : 0,
    salePriceTotal: req.body.salePriceTotal ? req.body.salePriceTotal : 0,
    data: req.body.data,
  });

  for (let i = 0; i < sale.data.length; i++) {
    let dat = await Stock.findById(sale.data[i].id);
    dat.stockQuantity = dat.stockQuantity - sale.data[i].quantity;
    await dat.save();
  }
  await sale.save();
  res.send(sale);
});

router.delete("/del", async (req, res) => {
  await Sale.remove({});
  res.send("done");
});

module.exports = router;
