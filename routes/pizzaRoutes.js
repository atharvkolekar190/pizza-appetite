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

router.post("/addpizza", async (req, res) => {
    try {
        const { pizzaData } = req.body; // Correct variable name here
        // Log the pizza data received
        console.log("Received Pizza Data:", pizzaData);
        // Convert price fields to numbers (Ensure they're being sent as strings or numbers)
        const formattedPrice = {
            smallSmall: Number(pizzaData.price.smallSmall),
            small_Medium: Number(pizzaData.price.small_Medium),
            medium_Medium: Number(pizzaData.price.medium_Medium),
            medium_Large: Number(pizzaData.price.medium_Large),
            large: Number(pizzaData.price.large),
        };
        console.log("Formatted Price:", formattedPrice);

        // Create a new pizza document
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

        // Save the new pizza to the database
        await newPizza.save();
        res.status(201).send("New Pizza Added Successfully!!");

    } catch (error) {
        // Log error details for debugging
        console.error("Error adding pizza:", error.message);
        console.error("Stack trace:", error.stack);
        res.status(500).json({ message: "Server Error: " + error.message }); // Return detailed error to client
    }
});

module.exports = router;