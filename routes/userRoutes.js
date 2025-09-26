const express = require("express");
const router = express.Router();
const User = require("../models/userModels");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: "kolekar.atharv18@gmail.com", // Replace with your email
        pass: "zeoq xpym fpqp ddkl", // Replace with your email password or app password
    },
});

router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    const newUser = new User({ name, email, password }); // Fix object creation
    try {
        await newUser.save(); // Add `await` for save
        res.send("New User Registered Successfully!!");
        
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});
router.post("/login",async(req,res)=>{
    const {email,password}=req.body

    try {
        const user=await User.find({email,password})
        if(user.length>0){
            const currentUser={
                _id:user[0]._id,
                name:user[0].name,
                email:user[0].email,
                isAdmin:user[0].isAdmin
            }
            res.send(currentUser)
        }
        else{
            return res.status(400).json({message:"User login failed"})
        }
    } catch (error) {
        return res.status(400).json({message:"error"})
    }
})

router.get("/getallusers",async(req,res)=>{
    try {
        const users = await User.find({}); // Fetch all pizzas from the database
        res.send(users); // Send the pizzas as a response
    } catch (error) {
        return res.status(400).json({ message: error.message }); // Handle errors
    }
});

router.post("/forgot-password", async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ status: "User does not exist" });
        }

        // Generate a temporary password (8-character random password)
        const tempPassword = Math.random().toString(36).slice(-8);

        // Update the user's password directly (No Hashing)
        user.password = tempPassword;
        await user.save();

        // Send email with the temporary password
        const mailOptions = {
            from: "kolekar.atharv18@gmail.com",
            to: email,
            subject: "Password Reset - Temporary Password",
            text: `Your temporary password is: ${tempPassword}\n\nPlease log in and change your password immediately.`,
        };

        let info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);

        return res.json({ status: "Temporary password sent to your email" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "Error", message: error.message });
    }
});
module.exports = router; // Ensure you're exporting the router
