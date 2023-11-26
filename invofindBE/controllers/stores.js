const router = require("express").Router();

const Department = require("../models/department");
const Store = require("../models/store");

router.post("/", async (req, res) => {
  try {
    const store = await Store.create({
      ...req.body,
      date: new Date(),
    });
    res.json(store);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/", async (req, res) => {
  const stores = await Store.findAll({
    include: [
      {
        model: Department,
        attributes: { exclude: ["storeLocation", "id"] },
      },
    ],
  });
  res.json(stores);
});

module.exports = router;