const mongoose=require("mongoose")

var mongoURL = "mongodb+srv://atharvk:AtharvKolekar@cluster0.bl9o2.mongodb.net/pizza-appetite";
mongoose.connect(mongoURL)
  .then(() => console.log("MongoDB Connection Success!!!!"))
  .catch((err) => console.error("Connection Failed!!", err));


module.exports=mongoose