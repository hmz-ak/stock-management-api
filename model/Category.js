var mongoose = require("mongoose");
var Joi = require("joi");

var categorySchema = mongoose.Schema({
  name: String,
});

//for sign up
function validateCategory(data) {
  var schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
}

var Category = mongoose.model("Category", categorySchema);

module.exports.Category = Category;
module.exports.validate = validateCategory;
