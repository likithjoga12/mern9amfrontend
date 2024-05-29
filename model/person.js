let mongoose= require("mongoose");
let studentschema= new mongoose.Schema({
    name:String,
    email:String,
    address:String,
})
module.exports=mongoose.model("users",studentschema);