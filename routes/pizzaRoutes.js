const express = require("express");
const router = express.Router();
const pizzaModels = require("../models/pizzaModels"); // Correctly import the pizza model

// Route to fetch all pizzas
router.get("/getAllPizzas", async (req, res) => {
    try {
        const pizzas = await pizzaModels.find({}); // Fetch all pizzas from the database
        res.send(pizzas); // Send the pizzas as a response
    } catch (error) {
        return res.status(400).json({ message: error.message }); // Handle errors
    }
});

// Route to add a new pizza
router.post("/addpizza", async (req, res) => {
    const {pizzaData} = req.body; // Use a unique variable name for request body

    // Convert price fields to numbers
    const formattedPrice = {
        smallSmall: Number(pizzaData.price.smallSmall),
        small_Medium: Number(pizzaData.price.small_Medium),
        medium_Medium: Number(pizzaData.price.medium_Medium),
        medium_Large: Number(pizzaData.price.medium_Large),
        large: Number(pizzaData.price.large),
    };
    console.log("Creating new object!!")
    // Create a new pizza document

    try {
        const newPizza = new pizzaModels({
            name: pizzaData.name,
            category: pizzaData.category,
            baseOptions: ["smallSmall", "small_Medium", "medium_Medium", "medium_Large", "large"], // Default base options
            sauces: pizzaData.sauces,
            cheeseType: pizzaData.cheeseType,
            image: pizzaData.image,
            description: "Taste is Awesome, Eat it!", // Default description
            price: formattedPrice,
        });
        await newPizza.save(); // Save the new pizza to the database
        res.send("New Pizza Added Successfully!!");
    } catch (error) {
        console.error("Error adding pizza:", error); // Log the error for debugging
        return res.status(400).json({ message: error.message }); // Handle errors
    }
});

module.exports = router;
