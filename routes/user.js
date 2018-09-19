var express=require("express")
var app=express.Router();
var bcrypt = require('bcryptjs');
var User=require("../models/user")
const passport = require('passport');
const mongoose = require('mongoose');

app.get("/login",(req,res)=>{
    res.render("login");
})
app.get("/signup",(req,res)=>{
    res.render("signup");
})

app.post("/signup",(req,res)=>{
    var err=[];
     if(req.body.password!=req.body.password1)
        err.push("Password Don't match");
    else if(req.body.password>0)
        err.push("Password too sort");
    if(err.length>0)
        res.render("/signup")
    else{
    var newuser=new User();
    newuser.name=req.body.name;
    newuser.email=req.body.email;
    var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(req.body.password, salt);
    newuser.password=hash;
    newuser.save().then(user=>{
        console.log("ok");
        req.flash('success_msg',"Successfully signup")
        res.redirect("/users/login");
    
    
        
    })
    }
})
app.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect:'/places',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});
app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports=app;