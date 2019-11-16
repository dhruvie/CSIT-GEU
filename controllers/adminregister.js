//jshint esversion: 6

const db = require("../model/database.js");

exports.register = function(req, res){
  if(req.body.password[0]===req.body.password[1]){
    let flag = false;
    if(req.body.canAddUsers==="yes"){
      flag = true;
    }
    db.Admin.register({username : req.body.email, name: req.body.name,  canAddUsers: flag, joined: new Date()}, req.body.password[0], function(err, admin){
      if(err){
        console.log(err);
        res.redirect("/admin/register");
      } else{
        res.redirect("/admin/users");
      }
    });
  }
};
