const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51QdSigATOtobaEjqUyzRJlTZnWAwOROJZrprcZrPqX8fD5J7L9NbivQFRoxJnAvDXd77UxxUPLr0MZyZN0IXrOiN00OZVt4MR3");
const Order = require("../models/orderModels");

router.post("/placeorder", async (req, res) => {
  const { token, subtotal, currentUser, cartItems } = req.body;

  try {
    console.log("Order Request Received: ", { token, subtotal, currentUser, cartItems });

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: subtotal * 100,
        currency: "INR",
        customer: customer.id,
        receipt_email: token.email,
      },
      { idempotencyKey: uuidv4() }
    );

    if (payment) {
      const newOrder = new Order({
        name: currentUser.name,
        email: currentUser.email,
        userid: currentUser._id,
        orderItems: cartItems,
        orderAmount: subtotal,
        shippingAddress: {
          street: token.card.address_line1,
          city: token.card.address_city,
          country: token.card.address_country,
          pincode: token.card.address_zip
        },
        transactionId: token.card.id
      })
      newOrder.save()
      console.log("Payment Successful: ", payment);
      console.log("Mongoose Added Data check it!!")
      res.send("Order Placed Successfully");

    } else {
      -
      res.status(500).send("Payment Failed");
    }
  } catch (error) {
    console.error("Payment Error: ", error);
    res.status(400).json({ message: "Something went wrong! " + error });
  }
});

router.get("/getuserorders", async (req, res) => {
  const { userid } = req.query; // Extract userid from query parameters
  console.log("GET /getuserorders called with userid:", userid); // Debug log

  try {
    const orders = await Order.find({ userid }); // Fetch orders
    console.log("Orders fetched successfully:", orders); // Debug log
    res.send(orders); // Send response
  } catch (error) {
    console.error("Error fetching orders:", error.message); // Error log
    return res.status(400).json({
      message: "Failed to fetch user orders.",
      error: error.message,
    });
  }
});


module.exports = router;


