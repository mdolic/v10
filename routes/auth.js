const express = require("express");
const router = express.Router();
const Campground = require("../models/campground");
const Comment = require("../models/comment");
const User = require("../models/user");
const passport = require("passport");

//root route 
router.get("/", function (req,res){
    res.render("landing");
});

//======================
//Authentication ROUTES
//==========================================

// show register form
router.get("/register", function(req, res){
    res.render("register",{page:'register'}); 
 });

 //handle sign up logic
 router.post("/register", function(req, res){
     var newUser = new User({username: req.body.username});
     User.register(newUser, req.body.password, function(err, user){
         if(err){
             req.flash("error",err);
             return res.render("register", {"error": err.message});
         }
         passport.authenticate("local")(req, res, function(){
            req.flash("success", "Successfully Signed Up! Nice to meet you " + req.body.username);
            res.redirect("/campgrounds"); 
         });
     });
 });

 //===========================
 //Login routes
 //==========================================
 //show login form
 router.get("/login", function(req,res){
    res.render("login", {page:'login'}); //error here comes from index.js middlewareObj.isLoggedIn code
});

//login logic
router.post("/login",passport.authenticate("local",
       {
           successRedirect:"/campgrounds",
           failureRedirect:"/login" 
       }), function(req,res){

});

//=============================
//logout route
//=============================================
router.get("/logout",function(req,res){
   req.logout();
   req.flash("success","Signed you out");
   res.redirect("/campgrounds");
});


module.exports = router;