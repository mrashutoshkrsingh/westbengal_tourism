var express=require("express");
var app=express();
var passport=require("passport")
var flash = require('connect-flash');
var session = require('express-session')
//body parser
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
//mongodb
var mongoose=require("mongoose");
		mongoose.connect("mongodb://localhost:27017/wb",{useNewUrlParser:true})
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}));
mongoose.Promise = global.Promise;
require('./config/passport')(passport);
app.use(flash());
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req,res,next){
  res.locals.success_msg=req.flash('success_msg');
  res.locals.error_msg=req.flash('error_msg');
  res.locals.error=req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//ejs
app.set("view engine","ejs");
//css
app.use(express.static("public"))
//indexroutes
var index=require("./routes/index");
app.use("/",index)
//user routes
var users=require("./routes/user");
app.use("/users",users)
//places routes
var places=require("./routes/places/places")
app.use("/places",places)
app.listen(process.env.PORT,process.env.ID,()=>{
    console.log("Server has started")
})