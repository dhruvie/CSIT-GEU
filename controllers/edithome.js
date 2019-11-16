//jshint esversion:6

const db = require("../model/database.js");
const fs = require("fs");

exports.edithome = (req, res) => {
  db.Home.find({}, function(err, FileList) {
    if (!err) {
      res.render("admin/edithome", {
        FileArray: FileList
      });
    }
  });
};

exports.uploadFile =function(req,res){
  let File = new db.Home({
    name: req.file.filename + ".pdf",
    heading: req.body.Heading,
    date: new Date(),
    content: req.body.Content
  });
  fs.rename(__dirname + "/../public/uploads/pdfs/" + req.file.filename , __dirname + "/../public/uploads/pdfs/" + req.file.filename + ".pdf", (err)=>{
    if(err){
      console.log(err);
    }
  });
  File.save();
  res.redirect("/admin/edithome");
};

exports.deleteFile = (req, res) => {
  db.Home.deleteOne({
    name: req.body.delete
  }, function(err){
      if(!err){
        let path = "./public/uploads/pdfs/" + req.body.delete;
        fs.access(path, function(err) {
          if (!err) {
            fs.unlinkSync(path);
          } else {
            console.log(err);
          }
        });
      }
      res.redirect("/admin/edithome");
  });
};
