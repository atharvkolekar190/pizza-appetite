const mongoose = require("mongoose");

const pizzaSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      category: { type: String, required: true },
      baseOptions: { type: Array, default: [] },
      sauces: { type: Array, default: [] },
      cheeseType: { type: String, required: true },
      image: { type: String, required: true },
      description: { type: String, required: true },
      price: {
        smallSmall: { type: Number, required: true },
        small_Medium: { type: Number, required: true },
        medium_Medium: { type: Number, required: true },
        medium_Large: { type: Number, required: true },
        large: { type: Number, required: true },
      },
    },
    {
      timestamps: true,
    }
  );
const pizzaModels=mongoose.model("pizzas_data", pizzaSchema, "pizzas_data")

module.exports = pizzaModels;
