var mongoose = require("mongoose");
// function getDate() {
//   var dateObj = new Date();
//   var month = dateObj.getUTCMonth() + 1; //months from 1-12
//   var day = dateObj.getDate();
//   var year = dateObj.getUTCFullYear();

//   return year + "-" + month + "-" + day;
// }
var customerSchema = mongoose.Schema({
  customerName: {
    type: String,
    default: "unknown",
  },
  address: String,
  contact: String,
  paid: Number,
  remaining: Number,
  costPriceTotal: { type: Number, default: 0 },
  salePriceTotal: { type: Number, default: 0 },
  data: [],
  date: { type: String, default: new Date().getTime() / 1000 },
});

var Customer = mongoose.model("Customer", customerSchema);

module.exports.Customer = Customer;
