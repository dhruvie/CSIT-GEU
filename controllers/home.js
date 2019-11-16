// jshint esversion:6

const db = require("../model/database.js");

exports.home= (req,res)=>{
  db.Home.find({},function(err,FileList){
    if(err){
      console.log(err);
      res.redirect("/");
    }else{
      res.render("index",{
        FileArray : FileList
      });
    }
  });
};
