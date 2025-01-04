const express = require("express");
const db = require("./db");
const cors = require("cors");

const pizzasRoute = require("./routes/pizzaRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}!`);
});
