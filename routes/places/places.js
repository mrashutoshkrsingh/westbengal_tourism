var express=require("express")
var app=express.Router();
var Place=require("../../models/places")
const {isLogin} = require('../../helpers/auth');
app.get("/",isLogin,function(req,res){
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
    Place.find({_id:req.params.id}).populate("comments").exec(function(err,places){
        if(err)
        console.log(err)
        else{
            res.render("places/show",{places:places[0],id:req.params.id})
            
        }
    })
})
app.put("/:id1",function(req, res) {
    Place.findByIdAndUpdate(req.params.id,req.body.places,function(err,places){
        if(err)
        console.log(err)
        else{
            res.redirect("/places/"+req.params.id)
            }
    })
})
app.get("/:id/edit",function(req,res){
    //console.log(req.params.id)
    Place.findById(req.params.id,function(err,place){
        if(err)
        throw err;
        else
        {
            //res.send(place)
            res.render("places/edit",{places:place})
        }
    })
})

app.delete("/:id", function(req, res){
   Place.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/places");
      } else {
          res.redirect("/places");
      }
   });
});
module.exports=app;