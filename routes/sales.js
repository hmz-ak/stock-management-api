var express = require("express");
var router = express.Router();
var { Sale } = require("../model/saleReport");
var { Stock } = require("../model/Stock");
router.get("/", async (req, res) => {
  let sales = await Sale.find().sort({ customerName: -1 });
  console.log(sales);
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
router.get("/getInvoiceNum", async (req, res) => {
  var number = 0;
  let lastDoc = await Sale.find({}).sort({ _id: -1 }).limit(1);
  if (lastDoc[0]) {
    number = lastDoc[0].temp_invoice_num;
  }
  res.send({ number });
});

router.get("/:id", async (req, res) => {
  let sales = await Sale.findById(req.params.id);
  res.send(sales);
});

router.post("/dummy", async (req, res) => {
  let dummy = new Sale();
  dummy.invoice_num = 0;
  dummy.temp_invoice_num = 0;
  await dummy.save();
  res.send(dummy);
});

router.post("/", async (req, res) => {
  let lastDoc = await Sale.find({}).sort({ _id: -1 }).limit(1);
  let sale = null;
  console.log(req.body);

  if (lastDoc[0]) {
    sale = new Sale({
      customerName: req.body.name ? req.body.name : "counter sale",
      costPriceTotal: req.body.costPriceTotal ? req.body.costPriceTotal : 0,
      salePriceTotal: req.body.salePriceTotal ? req.body.salePriceTotal : 0,
      invoice_num: lastDoc[0].temp_invoice_num + 1,
      temp_invoice_num: lastDoc[0].temp_invoice_num + 1,
      data: req.body.data,
    });
  } else {
    sale = new Sale({
      customerName: req.body.name ? req.body.name : "counter sale",
      costPriceTotal: req.body.costPriceTotal ? req.body.costPriceTotal : 0,
      salePriceTotal: req.body.salePriceTotal ? req.body.salePriceTotal : 0,
      invoice_num: 1,
      temp_invoice_num: 1,
      data: req.body.data,
    });
  }

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
