var mongoose = require("mongoose");
var Joi = require("joi");

var saleSchema = mongoose.Schema(
  {
    name: String,
    itemCode: Number,
    quantity: Number,
    discount: {
      type: Number,
      default: 0,
    },
    amount: Number,
  },
  { timestamps: true }
);

//for sign up
function validateSale(data) {
  var schema = Joi.object({
    name: Joi.string().required(),
    quantity: Joi.number().required(),
    itemCode: Joi.number().required(),
    amount: Joi.number().required(),
    discount: Joi.number(),
  });
  return schema.validate(data);
}

var Sale = mongoose.model("Sale", saleSchema);

module.exports.Sale = Sale;
module.exports.validate = validateSale;
