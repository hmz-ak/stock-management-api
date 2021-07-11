let { validate } = require("../model/Stock");
//middleware to check data if it passes joi validation or not
function validateStock(req, res, next) {
  // console.log(req.body);
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports = validateStock;
