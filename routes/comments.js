var express=require("express")
var app=express.Router({mergeParams: true})
var Place=require("../models/places")
var Comment=require("../models/comment")
app.post("/",function(req,res){
    var newComment=new Comment(req.body.comment)
    newComment.author.username=req.user.name;
    newComment.author.id=req.user._id;
    newComment.save(function(err,comment){
        if(err)
        throw err
        
        Place.findById(req.params.id,function(err,body){
            if(err)
            {
                req.flash('error_msg',"something went wrong");
                res.redirect("back")
            }
        else{
            body.comments.push(comment)
                    body.save();
            res.redirect("/places/"+body._id)
        }
        })
            
    })
    
    
})
app.delete("/:id1", function(req, res){
   Place.findByIdAndRemove(req.params.id1, function(err){
      if(err){
          res.redirect("/places");
      } else {
          res.redirect("/places/"+req.params.id)
      }
   });
});
app.put("/:id1",function(req,res){
    Comment.findByIdAndUpdate(req.params.id1,req.body.comment,function(err, comment) {
        if(err)
        throw err;
        res.redirect("/places/"+req.params.id)
        
    })
})

app.get("/new",function(req,res){
    console.log(req.params)
    Place.find({_id:req.params.id},function(err,places){
        if(err)
        console.log(err)
        else{
            //res.send(places)
              res.render("comment/new",{places:places[0]})
            }
    })
    
})

app.get("/:id1/edit",function(req,res){
    Comment.findById(req.params.id1,function(err,comment){
        if(err)
        throw err;
        res.render("comment/edit",{comment:comment,id:req.params.id,id2:req.params.id1})
    })
})


module.exports=app;