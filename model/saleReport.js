var mongoose = require("mongoose");

var saleSchema = mongoose.Schema(
  {
    customerName: {
      type: String,
      default: "unknown",
    },
    data: [],
  },
  { timestamps: true }
);

var Sale = mongoose.model("Sale", saleSchema);

module.exports.Sale = Sale;
