const express = require("express");
const cors = require("cors");
const mongoose=require("./db")
const pizzasRoute = require("./routes/pizzaRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const stockRoutes = require("./routes/stockRoutes");

const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("Server working 👍");
});

// Routes
app.use("/api/pizzas", pizzasRoute);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/stocks", stockRoutes);

// Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
