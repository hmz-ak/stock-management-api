var express = require("express");
var router = express.Router();
var { Category } = require("../model/Category");
var validateCategory = require("../middleware/validateCategory");

router.get("/", async (req, res) => {
  let categories = await Category.find();
  res.send(categories);
});

router.get("/:id", async (req, res) => {
  let categories = await Category.findById(req.params.id);
  res.send(categories);
});
router.put("/:id", validateCategory, async (req, res) => {
  let categories = await Category.findById(req.params.id);
  console.log(categories);
  categories.name = req.body.name;
  await categories.save();
  res.send(categories);
});
router.post("/", validateCategory, async (req, res) => {
  let category = new Category();
  category.name = req.body.name;

  await category.save();
  res.send(category);
});

router.delete("/:id", async (req, res) => {
  let category = await Category.findById(req.params.id);
  await category.remove();
  res.send(category);
});
module.exports = router;
