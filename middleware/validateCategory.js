let { validate } = require("../model/Category");
//middleware to check data if it passes joi validation or not
function validateCategory(req, res, next) {
  console.log(req.body.name);
  let { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  next();
}

module.exports = validateCategory;
