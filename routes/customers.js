var express = require("express");
var router = express.Router();
var { Sale } = require("../model/saleReport");
var { Customer } = require("../model/Customer");
var { Stock } = require("../model/Stock");

router.get("/", async (req, res) => {
  let sales = await Customer.find().sort({ date: "desc" });
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

router.post("/getCustomerByInvoice", async (req, res) => {
  console.log(req.body);
  if (req.body.value != "") {
    let number = parseInt(req.body.value);
    let customer = await Customer.find({ customerName: req.body.value });
    res.send(customer);
  } else {
    let customer = [];
    res.send([]);
  }
});
router.get("/:id", async (req, res) => {
  let sales = await Customer.findById(req.params.id);
  // console.log(sales);
  res.send(sales);
});

router.put("/invoice/:id", async (req, res) => {
  // console.log(req.body);
  let lastDoc = await Sale.find({}).sort({ _id: -1 }).limit(1);
  let sales = await Customer.findById(req.params.id);
  console.log(sales);

  for (let i = 0; i < req.body.receipt.length; i++) {
    sales.data.push(req.body.receipt[i]);
    let dat = await Stock.findById(req.body.receipt[i].id);
    dat.stockQuantity = dat.stockQuantity - req.body.receipt[i].quantity;
    await dat.save();
  }
  // sales.data.push(lastDoc[0].temp_invoice_num + 1);
  lastDoc[0].temp_invoice_num = lastDoc[0].temp_invoice_num + 1;

  await lastDoc[0].save();

  sales.salePriceTotal = sales.salePriceTotal + req.body.salePriceTotal;
  sales.costPriceTotal = sales.costPriceTotal + req.body.costPriceTotal;
  sales.remaining = sales.remaining + req.body.customerRemaining;
  sales.save();

  res.send(sales);
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  // let final = req.body.totalAmount - req.body.remaining;

  let sales = await Customer.findById(req.params.id);
  console.log(sales);

  sales.data.push({
    name: req.body.amount_desc ? req.body.amount_desc : "Payment Received",
    credit: req.body.remaining,
    total: req.body.remaining,
    date: new Date().getTime() / 1000,
  });
  sales.remaining = sales.remaining - req.body.remaining;
  sales.paid = sales.paid + req.body.remaining;
  await sales.save();
  // console.log(sales);
  res.send(sales);
});

router.post("/", async (req, res) => {
  let lastDoc = await Sale.find({}).sort({ _id: -1 }).limit(1);

  let sale = new Customer({
    customerName: req.body.customerName ? req.body.customerName : "unknown",
    costPriceTotal: req.body.costPriceTotal ? req.body.costPriceTotal : 0,
    salePriceTotal: req.body.salePriceTotal ? req.body.salePriceTotal : 0,
    paid: req.body.customer_paid ? req.body.customer_paid : 0,
    remaining: req.body.customerRemaining ? req.body.customerRemaining : 0,
    address: req.body.customerAddress ? req.body.customerAddress : "null",
    contact: req.body.customerContact ? req.body.customerContact : "null",
    invoice_num: lastDoc[0].temp_invoice_num + 1,
    data: req.body.receipt,
  });
  lastDoc[0].temp_invoice_num = lastDoc[0].temp_invoice_num + 1;

  await lastDoc[0].save();

  for (let i = 0; i < sale.data.length; i++) {
    let dat = await Stock.findById(sale.data[i].id);
    dat.stockQuantity = dat.stockQuantity - sale.data[i].quantity;
    await dat.save();
  }
  await sale.save();
  res.send(sale);
});

router.delete("/del", async (req, res) => {
  await Customer.remove({});
  res.send("done deleting");
});

module.exports = router;
