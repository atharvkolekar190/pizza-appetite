const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")("sk_test_51QdSigATOtobaEjqUyzRJlTZnWAwOROJZrprcZrPqX8fD5J7L9NbivQFRoxJnAvDXd77UxxUPLr0MZyZN0IXrOiN00OZVt4MR3");

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
      console.log("Payment Successful: ", payment);
      res.send("Payment Done");
    } else {
      res.status(500).send("Payment Failed");
    }
  } catch (error) {
    console.error("Payment Error: ", error);
    res.status(400).json({ message: "Something went wrong!", error });
  }
});

module.exports = router;
