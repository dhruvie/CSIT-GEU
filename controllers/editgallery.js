//jshint esversion:6

const db = require("../model/database.js");
const fs = require("fs");

exports.gallery = function(req, res) {
  db.Gallery.find({}, function(err, imageList) {
    if (err) {
      console.log("Could not fetch from database");
      res.redirect("/admin");
    } else {

      res.render("admin/editgallery", {
        imageArray: imageList,
      });
    }
  });
};


exports.uploadImage = function(req, res) {
  let image = new db.Gallery({
    name: req.file.filename,
    date: new Date()
  });
  image.save();
  res.redirect("/admin/editgallery");
};

exports.delete = (req, res) => {
  db.Gallery.deleteOne({
    name: req.body.delete
  }, function(err) {
    if (err) {
      console.log(err);
    } else {
      let path = "./public/uploads/" + req.body.delete;
      fs.access(path, function(err) {
        if (!err) {
          fs.unlinkSync(path);
        } else {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/editgallery");
  });
};

exports.update = (req, res) => {
  db.Gallery.updateOne({
    name: req.body.update
  }, {
    name: req.file.filename
  }, function(err, image) {
    if (err) {
      console.log(err);
    } else {
      let path = "./public/uploads/" + req.body.update;
      fs.access(path, function(err) {
        if (!err) {
          fs.unlinkSync(path);
        } else {
          console.log(err);
        }
      });
    }
    res.redirect("/admin/editgallery");
  });
};
