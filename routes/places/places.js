var express=require("express")
var app=express.Router();
var Place=require("../../models/places")

app.get("/",function(req,res){
    Place.find({},function(err,places){
        if(err)
        {
            console.log(err)
        }
        else{
            
         res.render("places",{places:places});   
        }
    })
    
})

app.get("/add",function(req,res){
    res.render("places/add");
})

app.post("/add",function(req,res){
    var newPlaces=new Place();
    newPlaces.name=req.body.name;
    newPlaces.description=req.body.description;
    newPlaces.image=req.body.image;
    newPlaces.author.id=req.user._id;
    newPlaces.author.username=req.user.name;
    newPlaces.save().then(places=>{
        res.redirect("/places")
    })
})
app.get("/:id",function(req, res) {
    Place.find({_id:req.params.id},function(err,places){
        if(err)
        console.log(err)
        else{
            res.render("places/show",{places:places})
        }
    })
})
module.exports=app;