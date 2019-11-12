//jshint esversion:6

const db = require("../model/database.js");

exports.gallery = function(req, res) {
  db.Gallery.find({}, function(err, imageList) {
    if (err) {
      console.log("Could not fetch from database");
      res.redirect("/");
    } else {
      res.render("gallery", {
        imageArray: imageList
      });
    }
  });
};
