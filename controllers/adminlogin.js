//jshint esversion: 6
// const app = require("express")();
// const session = require("express-session");
// const passport = require("passport");
// const passportLocalMongoose = require("passport-local-mongoose");
//
// app.use(session({
//   secret: 'keyboard cat',
//   resave: false,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());

const db = require("../model/database.js");

// passport.use(db.Admin.createStrategy());
// passport.serializeUser(db.Admin.serializeUser());
// passport.deserializeUser(db.Admin.deserializeUser());


exports.login = function(req, res){
  admin = new db.Admin({
    username : req.body.email,
    password : req.body.password
  });
  req.login(admin, function(err){
    if(err){
      console.log(err);
      res.redirect("/admin/login");
    } else{
      passport.authenticate("local")(req,res, function(){
        res.redirect("/admin/index");
      });
    }
  });
};
