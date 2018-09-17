var express=require("express")
var app=express.Router()

app.get("/",(req,res)=>{
    res.render("index")
})



app.get("/add",function(req, res) {
    res.render("./places/show")
})
module.exports=app;