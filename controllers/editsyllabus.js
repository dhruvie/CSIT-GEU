// jshint esversion: 6

const db = require("../model/database.js");
const fs = require("fs");

exports.editsyllabus=(req,res)=>{
  db.Syllabus.find({},function(err,FileList){
    if(!err){
      res.render("admin/editsyllabus",{
        FileArray:FileList
      });
    }
  });
};


exports.uploadFile = function(req, res) {
  let File = new db.Syllabus({
    name: req.file.filename,
    semester: req.body.Sem,
    specialisation: req.body.spec,
    date: new Date(),
    content: req.body.Content
  });
  File.save();
  res.redirect("/admin/editsyllabus");
};


exports.deleteFile = function(req, res) {
  db.Syllabus.deleteOne({
      name: req.body.delete
    },
    function(err) {
      if (!err) {
        let path = "./public/uploads/pdfs/" + req.body.delete;
        fs.access(path, function(err) {
          if (!err) {
            fs.unlinkSync(path);
          } else {
            console.log(err);
          }
        });
      }
      res.redirect("/admin/editsyllabus");
    });
};
