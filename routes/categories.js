var express = require("express");
var router = express.Router();
var { Category } = require("../model/Category");
var validateCategory = require("../middleware/validateCategory");

router.get("/", async (req, res) => {});

router.post("/", validateCategory, async (req, res) => {
  let category = new Category();
  category.name = req.body.name;

  await category.save();
  res.send(category);
});

module.exports = router;
