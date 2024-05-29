let mongoose= require("mongoose");
let employeeschema= new mongoose.Schema({
    name:String,
    email:String,
    address:String,
    salary:Number,
    phone:Number
})
module.exports=mongoose.model("employee",employeeschema);