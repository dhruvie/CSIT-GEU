//jshint esversion:6

const db = require("../model/database.js");

exports.timetables=(req,res)=>{
  db.TimeTable.find({},function(err,FileList){
    if(err)
    {
      console.log(err);
      res.redirect("/");
    }else
    {
      res.render("timetable",{
        FileArray: FileList
      });
    }
  });
};
