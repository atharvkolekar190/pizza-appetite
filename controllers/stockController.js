const Stock = require("../models/stockModels");

exports.getStocks = async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.status(200).json(stocks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching stocks", error });
  }
};

exports.updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedStock);
  } catch (error) {
    res.status(500).json({ message: "Error updating stock", error });
  }
};

exports.deleteStock = async (req, res) => {
  try {
    const { id } = req.params;
    await Stock.findByIdAndDelete(id);
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting stock", error });
  }
};
