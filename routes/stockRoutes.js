const express = require("express");
const router = express.Router();
const stockController = require("../controllers/stockController");

// Routes for stocks
router.get("/", stockController.getStocks);
router.put("/:id", stockController.updateStock);
router.delete("/:id", stockController.deleteStock);

module.exports = router;
