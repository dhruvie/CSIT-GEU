//jshint esversion:6

const db = require("../model/database.js");

exports.syllabus= (req,res)=>{
  db.Syllabus.find({},function(err,FileList){
    if (err) {
      console.log("Could not fetch from database");
      res.redirect("/");
    } else {
      res.render("syllabus", {
        FileArray : FileList,
      });
    }
  });
};
