// jshint esversion: 6

const db = require("../model/database.js");
const fs = require("fs");

exports.editPost = (req, res) => {
  db.TimeTable.find({}, function(err, FileList) {
    if (!err) {
      res.render("admin/editpost", {
        FileArray: FileList
      });
    }
  });
};

exports.uploadFile = function(req, res) {
  let File = new db.TimeTable({
    name: req.file.filename + ".pdf",
    semester: req.body.Sem,
    date: new Date(),
    content: req.body.Content
  });
  fs.rename(__dirname + "/../public/uploads/pdfs/" + req.file.filename , __dirname + "/../public/uploads/pdfs/" + req.file.filename + ".pdf", (err)=>{
    if(err){
      console.log(err);
    }
  });
  File.save();
  res.redirect("/admin/editpost");
};


exports.deleteFile = function(req, res) {
  db.TimeTable.deleteOne({
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
      res.redirect("/admin/editpost");
    });
};
