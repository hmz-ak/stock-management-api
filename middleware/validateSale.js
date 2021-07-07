let { validate } = require("../model/saleReport");
//middleware to check data if it passes joi validation or not
function validateSale(req, res, next) {
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports = validateSale;
