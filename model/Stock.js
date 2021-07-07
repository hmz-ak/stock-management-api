var mongoose = require("mongoose");
var Joi = require("joi");

var stockSchema = mongoose.Schema(
  {
    name: String,
    costPrice: Number,
    salePrice: Number,
    category: String,
    itemCode: Number,
    stockQuantity: Number,
  },
  { timestamps: true }
);

//for sign up
function validateStock(data) {
  var schema = Joi.object({
    name: Joi.string().required(),
    costPrice: Joi.number().required(),
    salePrice: Joi.number().required(),
    stockQuantity: Joi.number().required(),
    itemCode: Joi.number().required(),
    category: Joi.string().required(),
  });
  return schema.validate(data);
}

var Stock = mongoose.model("Stock", stockSchema);

module.exports.Stock = Stock;
module.exports.validate = validateStock;
