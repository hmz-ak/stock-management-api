var mongoose = require("mongoose");
function getDate() {
  var dateObj = new Date();
  var month = dateObj.getUTCMonth() + 1; //months from 1-12
  var day = dateObj.getDate();
  var year = dateObj.getUTCFullYear();

  return year + "-" + month + "-" + day;
}
var saleSchema = mongoose.Schema({
  customerName: {
    type: String,
    default: "unknown",
  },
  invoice_num: Number,
  temp_invoice_num: Number,
  costPriceTotal: { type: Number, default: 0 },
  salePriceTotal: { type: Number, default: 0 },
  data: [],
  date: { type: String, default: new Date().getTime() / 1000 },
});

var Sale = mongoose.model("Sale", saleSchema);

module.exports.Sale = Sale;
