const mongoose =require("mongoose")



const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true }, // Ensure email is unique
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false },
    },
    {
        timestamps: true, // Automatically add createdAt and updatedAt fields
    }
);
module.exports=mongoose.model('users',userSchema)
// const userSchema=mongoose.Schema({
//     name:{type:String,require},
//     email:{type:String,require},
//     password:{type:String,require},
//     isAdmin:{type:Boolean, require, default:false},
// },{
//     timestamps:true,
// }
// )