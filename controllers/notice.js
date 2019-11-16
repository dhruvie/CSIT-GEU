//jshint esversion:6

const db = require("../model/database.js");

exports.editnotice= (req,res)=>{
  res.render("admin/editNotice");
};


exports.notice = (req,res)=>{
  db.NoticePlain.find({},function(err, TextList){
    if(!err){
      db.NoticePdf.find({},function(err,FileList){
        if(!err){
          res.render("notices",{
            TextArray : TextList,
            FileArray : FileList
          });
        }
      });
    }
  });
};
