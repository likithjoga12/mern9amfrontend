let express=require("express");
require("./db");
let sturouting= require("./Routing/Student")
let Employee=require( './model/Employee');
let Signup=require("./model/Signup")
let app=express();
let cors=require( "cors");
app.use(cors());
app.use(express.json())

app.use("/student",sturouting);

app.get("/employee",async(req,res)=>{

    let user=await Employee.find();
    if(user.length>0){
        res.send(user)
    }
    else{
        res.send("no data  found");
    }
})

app.post('/employee',async (req, res) => {
   
    let user= new Employee(req.body);
    let result=await user.save()
    res.send(result)
})

app.delete('/employee/:_id', async (req, res) => {
    let user=await Employee.deleteOne(req.params);
    res.send(user)
      // res.send("Deleted")
  });

   app.get( "/employee/:id",async ( req , res )=>{
    let user = await Employee.findOne({_id: req.params.id});
    
   res.send(user)
   })
   
   app.put("/employee/:id" ,async (req , res)=>{
    let updateUser = await Employee.updateOne({_id: req.params.id},{$set : req.body} );
    res.send(updateUser)
})
   
app.get( '/search2/:key' , async ( req , res )=>{

    let user= await Employee.find({ $or:[
        {name:{$regex:req.params.key}},
        {email:{$regex:req.params.key}},
        {address:{$regex:req.params.key}},
        {
            salary:{$regex:req.params.key}
        },
        {phone:{ $regex: req.params.key }}
    ]})
    res.send(user)
})
app.post('/signup',async (req, res) => {
   
    let user= new Signup(req.body);
    let result=await user.save()
    res.send(result)
})
app.post('/login',async (req, res) => {
    const {email,password}= req.body;
    let user= await Signup.findOne({email:email})
    if(
        user.password==password
    )
    {
        res.send(user)

        }
        else
        {
            res.send("Invalid")
            }

})
app.post("/forgot", async(req,res)=>{
    let {email}=req.body;
    let user=await Signup.findOne({email:email});
    if(user){
        res.send(user);
    }
    else
    {
        res.send("Invalid")
    }
})
//app.post('/logout', (req, res) => {
  ///  res.clearCookie('token').send({ message: 'Logged out successfully' });
  //});
app.get("*",(req,res)=>{
    res.send("<h1>Invalid page</h1>");
})
app.listen(4000);
console.log('Server is running at http ://localhost:4000');