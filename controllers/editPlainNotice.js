//jshint esversion:6

const db = require("../model/database.js");
const fs = require("fs");

exports.editplainNotice = (req, res) => {
  db.NoticePlain.find({}, function(err, TextList) {
    if (!err) {
      res.render("admin/editPlainNotice", {
        TextArray: TextList
      });
    }
  });
};


exports.uploadText =function(req,res){
  let Text = new db.NoticePlain({
    heading: req.body.Heading,
    date: new Date(),
    content: req.body.Content
  });
  Text.save();
  res.redirect("/admin/editplainNotice");
};

exports.deleteText = (req, res) => {
  db.NoticePlain.deleteOne({
    _id : req.body.delete
  }, function(err){
      if(err){
        console.log(err);
      }
      res.redirect("/admin/editPlainNotice");
  });
};
