const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: ["base", "sauce", "cheese", "veggie", "meat", "topping"],
    },
    quantity: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true, default: 0 },
    threshold: { type: Number, required: true, default: 10 },
    unit: {
      type: String,
      required: true,
      enum: ["kg", "grams", "liters", "ml", "pieces"],
      default: "pieces",
    },
    lastUpdated: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["available", "low stock", "out of stock"],
      default: "available",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields automatically
  }
);

// Middleware to calculate stock status based on quantity and threshold
stockSchema.pre("save", function (next) {
  if (this.quantity === 0) {
    this.status = "out of stock";
  } else if (this.quantity <= this.threshold) {
    this.status = "low stock";
  } else {
    this.status = "available";
  }
  this.lastUpdated = Date.now();
  next();
});

// For updating stock status during updates
stockSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.quantity !== undefined) {
    if (update.quantity === 0) {
      update.status = "out of stock";
    } else if (update.quantity <= update.threshold) {
      update.status = "low stock";
    } else {
      update.status = "available";
    }
    update.lastUpdated = Date.now();
  }
  next();
});

// Prevent OverwriteModelError by checking for existing model
const Stock = mongoose.models.Stock || mongoose.model("Stock", stockSchema);

module.exports = Stock;
