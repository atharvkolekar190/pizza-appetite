const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.ADMIN_EMAIL, // Admin email address
    pass: process.env.ADMIN_PASSWORD, // Admin email password (use an app-specific password if needed)
  },
});

// Function to send stock alert email
async function sendStockAlert(stockItem) {
  const mailOptions = {
    from: process.env.ADMIN_EMAIL, // Sender email
    to: process.env.ADMIN_EMAIL,   // Recipient email (Admin email)
    subject: `Low Stock Alert: ${stockItem.name}`,
    text: `The stock for ${stockItem.name} (type: ${stockItem.type}) is critically low.\n
    Remaining Quantity: ${stockItem.quantity}\n
    Please restock to avoid disruptions.`,
  };

  try {
    // Send the email
    await transporter.sendMail(mailOptions);
    console.log(`Stock alert email sent for ${stockItem.name}`);
  } catch (error) {
    console.error("Error sending stock alert email: ", error);
  }
}

module.exports = { sendStockAlert };
