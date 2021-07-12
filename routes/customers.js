var express = require("express");
var router = express.Router();
var { Sale } = require("../model/saleReport");
var { Customer } = require("../model/Customer");
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
  let sale = new Customer({
    customerName: req.body.customerName ? req.body.customerName : "unknown",
    costPriceTotal: req.body.costPriceTotal ? req.body.costPriceTotal : 0,
    salePriceTotal: req.body.salePriceTotal ? req.body.salePriceTotal : 0,
    paid: req.body.customer_paid ? req.body.customer_paid : 0,
    remaining: req.body.customerRemaining ? req.body.customerRemaining : 0,
    address: req.body.customerAddress ? req.body.customerAddress : "null",
    contact: req.body.customerContact ? req.body.customerContact : "null",
    data: req.body.receipt,
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
