let mongoose= require("mongoose");
let signupschema= new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    address:String,
})
module.exports=mongoose.model("signup",signupschema);