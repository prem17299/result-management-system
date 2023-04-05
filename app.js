var express=require("express");
const sequelize=require('./util/database');
var bodyParser = require('body-parser');
const alert=require("alert");
const Teacher=require('./models/teacher.js');
const bcrypt=require("bcryptjs");
const Student=require('./models/student.js');

var app=express();
const port= process.env.PORT||5000;

//middlewares
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'));
app.set('view engine', 'ejs')

//database sync
sequelize.sync({force:false}).then((res)=>{
    console.log("Resync done");
  });

//HOME PAGE
app.get("",(req,resp)=>{
  resp.render('dashboard');
})

// All get API 

//STUDENT LOGIN GET  
app.get("/studentlogin", (req, resp) => {
  resp.render('studentlogin');
});

//TEACHER LOGIN GET 
app.get("/teacherlogin", (req, resp) => {
 resp.render('teacherlogin');
});

//ADDRECORDS GET 
app.get("/addrecord", (req, resp) => {
  resp.render('addrecord');
});

//TEACHER REGISTER GET 
app.get("/register", (req, resp) => {
  resp.render('register');
});

//DELETE RECORD GET 
app.get("/delete/:rollno", async(req, resp) => {
  var user=await Student.destroy({where:{rollno:req.params.rollno}});
  if(user==0)
  alert("No record Found");
  else{
    alert("Record Deleted Sucessfully");
    resp.redirect('/listrecords');

  }  
});

//UPDATE RECORD GET 
app.get("/updaterecord/:rollno", async(req, resp) => {
  
  var user=await Student.findOne({where:{rollno:req.params.rollno}});
    resp.render('updaterecord', { user });
});

//LISTRECORDS GET
app.get("/listrecords", async(req, resp) => {
    var user=await Student.findAll();
    if(user==null)
    alert("No record Found");
    else{
         resp.render('listrecords', { user});
    }  
});

// ALL POST APIS

//STUDENT LOGIN POST
app.post("/studentlogin", async (req, resp) => {
var user=await Student.findOne({where:{rollno:req.body.rollno,name:req.body.name}});

if(user==null){
          alert("No Record Found ,Please Try again !!")
          resp.render('studentlogin');
}else{
  alert("Student Login Sucessfull");
  resp.render('studentrecord', { user});
}

});

//Teacher Login Post
app.post("/teacherlogin", async (req,res)=>{
  var {email,password}=req.body;
  const userWithEmail= await Teacher.findOne({where:{email}}).catch((err)=>{
    console.log("Error"+err);
  });
  if(userWithEmail){
    console.log(password);
    console.log(userWithEmail.password);
    if (await bcrypt.compare(password, userWithEmail.password)) {
      alert("Login Successfull");
      res.redirect('listrecords');
  }
  else {
      alert("Wrong Password Please try again !!") ;
      res.render('teacherlogin');       
      }
  }else{
    alert("Please Try again");
    res.render('teacherlogin');
  }
});

//Teacher Register Post
app.post("/register", async(req,res)=>{
var {email,password}=req.body;
const alreadyExistsUser= await Teacher.findOne({where:{email}}).catch((err)=>{
  console.log("Error"+err);
});

if(alreadyExistsUser){
  alert("User already Exists")
  res.render('register');
  return;
}

const salt = await bcrypt.genSalt(10);
password = await bcrypt.hash(req.body.password, salt);

const newUser= new Teacher({email,password});

const savedUser=await newUser.save().catch((err)=>{
  alert("Cannot register User at the moment");
  console.log("Error"+err);
  res.render('register');
});

if(savedUser){
  alert("Registration Successful")
  res.redirect('teacherlogin');
} 

});


//ADD RECORDS POST 
app.post("/addrecord", async(req, resp) => {
  const {rollno,name,dob,score}=req.body;
  const newUser= new Student({rollno,name,dob,score});

 const savedUser=await newUser.save().catch((err)=>{
         console.log("Error in adding record="+err);
         alert("Roll number exists , Please add another Roll no.(1-100) and score(1-500)");
});

if(savedUser){
          alert("Recod Added Successfully")
          resp.redirect('listrecords');
} 
});

//UPDATE RECORD POST
app.post("/updaterecord/:rollno", async (req, res) => {

  const savedUser=await Student.update({name:req.body.name,dob:req.body.dob,score:req.body.score},{where:{rollno:req.params.rollno}}).catch((err)=>{
         console.log("Error in adding record="+err);
         alert("Roll number exists , Please add another Roll no.(1-100) and score(1-500)");
});

if(savedUser){
          alert("Recod Updated Successfully")
          res.redirect('/listrecords');
}
});

//404 PAGE GET
app.get("*", (req, resp) => {
  resp.render('404');
});

// SERVER
app.listen(port,()=>{
  console.log("app is running on port",port)
});


