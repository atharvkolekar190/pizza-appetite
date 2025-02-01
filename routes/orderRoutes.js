const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51QdSigATOtobaEjqUyzRJlTZnWAwOROJZrprcZrPqX8fD5J7L9NbivQFRoxJnAvDXd77UxxUPLr0MZyZN0IXrOiN00OZVt4MR3");
const Order = require("../models/orderModels");
const Stock = require("../models/stockModels");
const mongoose = require("mongoose");
const { sendStockAlert } = require("../utils/email");

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
      // Update stock
      for (const item of cartItems) {
        const stockItem = await Stock.findOne({ name: item.name, type: item.type });

        if (stockItem) {
          stockItem.quantity -= item.quantity;

          if (stockItem.quantity <= stockItem.threshold) {
            stockItem.status = "low stock";
            await sendStockAlert(stockItem); // Send email if stock is below threshold
          }

          if (stockItem.quantity <= 0) {
            stockItem.status = "out of stock";
          }

          await stockItem.save();
        }
      }

      // Save the order
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
          pincode: token.card.address_zip,
        },
        transactionId: token.card.id,
      });

      await newOrder.save();
      console.log("Payment Successful: ", payment);
      res.send("Order Placed Successfully");
    } else {
      res.status(500).send("Payment Failed");
    }
  } catch (error) {
    console.error("Payment Error: ", error);
    res.status(400).json({ message: "Something went wrong! " + error });
  }
});

module.exports = router;